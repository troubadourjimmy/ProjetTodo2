import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { forbiddenUserValidator } from 'src/app/directives/forbidden-user.directive';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() listId:string;
  @Input() userEmail:string;
  //userEmail:string = '142857';
  shareForm: FormGroup;
  //value bind avec ion-select authorization
  auth:string;
  canRead:string;
  canWrite:string;


  constructor(private fb: FormBuilder,
    private listService: ListService,
    private toastCtrl:ToastController,
    private modalContrl:ModalController) {
      /*this.shareForm = this.fb.group({
      email: [this.inputEmail,[Validators.required,
                  Validators.minLength(5),
                  forbiddenUserValidator(/1234567/i)
                ]],*/
      this.shareForm = new FormGroup({
        email: new FormControl('', [Validators.required,
          Validators.minLength(5),
          forbiddenUserValidator(/123/i)
        ])
      });              
    }

  ngOnInit() {
    console.log(this.userEmail);
    console.log(this.listId)
  }

  shareList()
  {
      if(this.auth=="canRead")
      {
        this.listService.shareReadList(this.listId, this.shareForm.get("email").value);
      }
      
      else if(this.auth=="canWrite")
      {
          this.listService.getOneList(this.listId).subscribe(async (data:any)=>{
          this.canRead= data.canRead;
          if( this.canRead.indexOf(this.shareForm.get('email').value)!=-1){
      
            const toast = this.toastCtrl.create({
              message: 'this list is alreal in the canRead list of the user '+this.shareForm.get('email').value,
              duration: 5000,
              position: 'middle',
              color:'danger'
            });
            (await toast).present();
            //await this.modalContrl.dismiss();
             
          }else{
            this.listService.shareWriteList(this.listId, this.shareForm.get("email").value);
            //await this.modalContrl.dismiss();
             }   
          });
        //this.listService.shareWriteList(this.listId, this.shareForm.get("email").value);
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
