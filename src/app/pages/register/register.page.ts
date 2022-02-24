import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private authen:AuthentificationService,
              private toastCtrl:ToastController,
              private route:Router) {

    this.registerForm = this.fb.group({
    email: ['',[Validators.required,Validators.minLength(5)]],
    password: ['',[Validators.required,Validators.minLength(7)]]
    //repassword: ['',[Validators.required,Validators.minLength(7)]]
    });
  }
  ngOnInit() {}

  async signup() {
    try{
        const UserCredential = await this.authen.createUser(this.registerForm.get("email").value, this.registerForm.get("password").value);
        console.log(UserCredential);
        const toast =await this.toastCtrl.create({
          message: 'a verification email has already been sent to you, please verify your email',
          duration: 5000,
          position: 'middle',
          color:'light'
        });
        (await toast).present();
        this.route.navigate(['login'])
    }catch(e){
         var errorCode = e.code;
         var errorMessage = e.message;

         
      if (errorCode == 'auth/weak-password') {
          const toast = await this.toastCtrl.create({
          message: "Password is too weak!",
          duration: 5000,
          position: 'middle',
          color:'danger'
        });
        (await toast).present();

      }else{
        const toast = this.toastCtrl.create({
          ///enlever la partie 'firebase:' dans le errorMessage
          message: errorMessage.substr(10),
          duration: 5000,
          position: 'middle',
          color:'danger'
        });
        (await toast).present();
      }
          
    }

  }

}
