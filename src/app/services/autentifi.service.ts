import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  



 
@Injectable({
  providedIn: 'root'
})
export class AutentifiService { 

  
  constructor(private fireAuthen:AngularFireAuth) 
  { }

   
  loginWithEmail(email:string, password: string) 
  {
    //methode example sur le lien https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
    this.fireAuthen.signInWithEmailAndPassword(email, password)
    .catch(function(error) {
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

  // createUser(email:string, password: string) {
  //   this.fireAuthen.createUserWithEmailAndPassword(email, password)
  //   .catch(function(error) 
  //   {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     if (errorCode == 'auth/weak-password') 
  //     {
  //       alert('The password is too weak.');
  //     } 
  //     else 
  //     {
  //       alert(errorMessage);
  //     }
  //     console.log(error);
  //   });
  // }



  // public loginWithEmail(email: string, psw: string) {
  //   this.fireAuthen.signInWithEmailAndPassword(email,psw)
  // .then((userCredential) => {
  //   // Signed in
  //   var user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });
  // }

  // public createUser(email: string, psw: string) {
  //   this.fireAuthen.createUserWithEmailAndPassword(email, psw)
  //   .then((userCredential) => {
  //     // Signed in 
  //     var user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ..
  //   });
  // }

 


}
