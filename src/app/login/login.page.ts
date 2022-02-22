import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authen:AuthentificationService) {

    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required,Validators.minLength(7)]]
    });
   }

  ngOnInit() {}

  login() {
    if(this.loginForm.valid) {
        this.authen.loginWithEmail(this.loginForm.get("email").value, this.loginForm.get("password").value);
    }
  }

}
