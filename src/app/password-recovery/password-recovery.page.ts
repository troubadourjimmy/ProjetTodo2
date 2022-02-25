import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  recoveryForm: FormGroup;
  constructor(private fb: FormBuilder,
              private authen:AuthentificationService,) { 

      this.recoveryForm = this.fb.group({
        email: ['',
                [Validators.required,Validators.minLength(5)]]
    });
  }

  ngOnInit() {
  }

  recoverPassword()
  {
      this.authen.recoverPassword(this.recoveryForm.get("email").value);
  }
}
