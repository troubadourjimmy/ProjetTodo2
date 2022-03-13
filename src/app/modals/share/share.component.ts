import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() listId:string;
  shareForm: FormGroup;
  //value bind avec ion-select authorization
  auth:string;
  constructor(private fb: FormBuilder,
    private listService: ListService,
    private modalContrl:ModalController) {
      this.shareForm = this.fb.group({
      email: ['',[Validators.required,Validators.minLength(5)]],
       
      
      
  });
}

  ngOnInit() {}

  shareList()
  {
      if(this.auth=="canRead")
      {
        this.listService.shareReadList(this.listId, this.shareForm.get("email").value);
      }
      
      else if(this.auth=="canWrite")
      {
        this.listService.shareWriteList(this.listId, this.shareForm.get("email").value);
      }
      
      this.modalContrl.dismiss();
  }

  cancle()
  {
    this.modalContrl.dismiss();
  }

  //afficher la value de autho(read or write) choisit
  getAuthValue()
  {
    console.log(this.auth);
  }

}
