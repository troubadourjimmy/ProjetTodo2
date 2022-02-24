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
        const toast = this.toastCtrl.create({
          message: 'un email de verification deja envoye a vous,si il vous plaît vérifier votre e-mail',
          duration: 5000,
          position: 'middle',
          color:'light'
        });
        (await toast).present();
        this.route.navigate(['login'])
    }catch(e){
        const toast = this.toastCtrl.create({
        message: e.message,
        duration: 5000,
        position: 'middle',
        color:'danger'
      });
       (await toast).present();

    }

  }

}
