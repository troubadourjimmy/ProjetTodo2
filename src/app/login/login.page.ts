import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private authen:AuthentificationService,
              //toast est une notification généralement
              private toastCtrl:ToastController,
              private route:Router) {

    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required,Validators.minLength(7)]]
    });
   }

  ngOnInit() {}

  async login() {
    try{
      const userCrend= await this.authen.loginWithEmail(this.loginForm.get("email").value, this.loginForm.get("password").value);
      console.log(userCrend);
      if(userCrend.user.emailVerified){
        const toast =await this.toastCtrl.create({
          message: 'connect successfully',
          duration: 3000,
          position: 'middle',
          color:'light'
        });
        (await toast).present();
        this.route.navigate(['home']);
      }else{
        const toast =await this.toastCtrl.create({
          message: 'you have not yet verified your email',
          duration: 3000,
          position: 'middle',
          color:'light'
        });
        (await toast).present();

      }

    }catch(e){
      var errorCode = e.code;
      var errorMessage = e.message; 
      if (errorCode === 'auth/wrong-password') {
          const toast = this.toastCtrl.create({
          message: "wrong password !",
          duration: 5000,
          position: 'middle',
          color:'danger'
        });
        (await toast).present();

      }else{
        const toast = this.toastCtrl.create({
          //enlever le mot 'firebase:' dans le errorMessage
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
