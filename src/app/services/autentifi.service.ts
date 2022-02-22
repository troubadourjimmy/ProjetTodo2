import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  
import 'firebase/auth';
//import firebase from 'firebase/app';
import { Router } from '@angular/router';



 
@Injectable({
  providedIn: 'root'
})
export class AutentifiService { 

  userData:any;
  constructor(private fireAuthen:AngularFireAuth,private route:Router) 
  { }

   
  loginWithEmail(email:string, password: string) 
  {
    //methode example sur le lien https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
    //https://firebase.google.com/docs/auth/web/password-auth?hl=zh-cn#web-version-9_1
    this.fireAuthen.signInWithEmailAndPassword(email, password).then((userCredential)=>
    {
      var user = userCredential.user;
      this.userData = userCredential;
      //console.log(`user : ${user}`);
      this.route.navigate(['home'])
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') 
      {
        alert('Wrong password.');
      } 
      else 
      {
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  createUser(email:string, password: string)
  {
     
    this.fireAuthen.createUserWithEmailAndPassword(email, password).then((userCredential)=>
    {
      var user = userCredential.user;
      this.userData = userCredential;
      //console.log(`user : ${user}`);
      this.route.navigate(['home'])
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } 
      else {
        alert(errorMessage);
      }
      console.log(error);
    });

  }



  async sendEmailVerification() {
    // [START auth_send_email_verification]
    (await this.fireAuthen.currentUser).sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
      });
    // [END auth_send_email_verification]
  }

   

}
