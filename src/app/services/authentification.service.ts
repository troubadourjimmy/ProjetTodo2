import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  
import 'firebase/auth';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { async } from '@firebase/util';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

 

 
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  
  
  constructor(private fireAuthen:AngularFireAuth,
              private route:Router,
              private toastCtrl:ToastController) {}

   
  // loginWithEmail(email:string, password: string) {
  //   //methode example sur le lien https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
  //   //https://firebase.google.com/docs/auth/web/password-auth?hl=zh-cn#web-version-9_1
  //   this.fireAuthen.signInWithEmailAndPassword(email, password).then((userCredential)=> {
  //     var user = userCredential.user;
  //     this.userData = userCredential;
  //     console.log(userCredential)
  //     //console.log(`user : ${user}`);
  //     this.route.navigate(['home'])
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     if (errorCode === 'auth/wrong-password') {
  //       alert('Wrong password.');
  //     } else {
  //       alert(errorMessage);
  //     }
  //     console.log(error);
  //   });
  // }

  async loginWithEmail(email:string, password: string) {
    //methode example sur le lien https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
    //https://firebase.google.com/docs/auth/web/password-auth?hl=zh-cn#web-version-9_1
    const userCred= await this.fireAuthen.signInWithEmailAndPassword(email, password);
    //console.log(userCred.user.email);
    return userCred;
  }







  // createUser(email:string, password: string) {
     
  //   this.fireAuthen.createUserWithEmailAndPassword(email, password)
  //   .then((userCredential)=> {
  //     //var user = userCredential.user;
  //     //this.userData = userCredential;
  //     //console.log(`user : ${user}`);
  //     //this.route.navigate(['home'])
      
  //     userCredential.user.sendEmailVerification().then(()=>
  //     {
  //       alert('il y a une email a envoyer a vous');
  //       this.route.navigate(['login']);
  //     });
      
    

  //   }).catch(function(error){
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     if (errorCode == 'auth/weak-password') {
  //       alert('The password is too weak.');
  //     } else {
  //       alert(errorMessage);
  //     }
  //     console.log(error);
  //   })

  // }
  public async createUser(email: string, psw: string){
    
    const userCred = await this.fireAuthen.createUserWithEmailAndPassword(email, psw);
    await userCred.user.sendEmailVerification();
    return userCred;
  }

  signout()
  {
    this.fireAuthen.signOut();
      
      // Sign-out successful. 
  }

  
  async recoverPassword(email:string)
  {
    //Returns the FirebaseAuth object
    try{ 
        const auth = getAuth();
        await sendPasswordResetEmail(auth,email);
        const toast =await this.toastCtrl.create({
          message: 'a password rest email send to you',
          duration: 3000,
          position: 'middle',
          color:'light'
        });
        (await toast).present();
        this.route.navigate(['login']);
    }catch(e){
        const toast =await this.toastCtrl.create({
        message:e.message.substr(10),
        duration: 3000,
        position: 'middle',
        color:'light'
      });
        (await toast).present();

    }
   


  }


}
