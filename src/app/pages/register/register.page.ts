import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private authen:AuthentificationService) {

    this.registerForm = this.fb.group({
      email: ['',[Validators.required,Validators.minLength(5)]],
      password: ['',[Validators.required,Validators.minLength(7)]]
      //repassword: ['',[Validators.required,Validators.minLength(7)]]
    });
  }
  ngOnInit() {}

  signup() {
    if(this.registerForm.valid) {
        this.authen.createUser(this.registerForm.get("email").value, this.registerForm.get("password").value);
    }
  }

}
