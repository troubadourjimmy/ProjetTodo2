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
          forbiddenUserValidator(/123/i),Validators.email
        ])
      });              
    }

  ngOnInit() {
    console.log(this.userEmail);
    console.log(this.listId)
  }

  async shareList()
  {
      //si on choisir partager the read authorization a utilsateur
      if(this.auth=="canRead")
      {
          
          this.listService.getOneList(this.listId).subscribe(async (data:any)=>{
          this.canRead = data.canRead;
          this.canWrite=data.canWrite;
          
          if(this.canWrite.indexOf(this.shareForm.get('email').value)!=-1){
      
            const toast = this.toastCtrl.create({
              message: 'this list is already in the canWrite list of the user '+this.shareForm.get('email').value,
              duration: 5000,
              position: 'middle',
              color:'danger'
            });
            (await toast).present();
             
             
          }
          else if(this.canRead.indexOf(this.shareForm.get('email').value)!=-1){
      
            // const toast = this.toastCtrl.create({
            //   message: 'you have already shared the read authorization to the user !!!!!!'+this.shareForm.get('email').value,
            //   duration: 5000,
            //   position: 'middle',
            //   color:'danger'
            // });
            // (await toast).present();
           
             
          }
          
          else{
            
            await this.listService.shareReadList(this.listId, this.shareForm.get("email").value);
            this.modalContrl.dismiss();
            location.reload();
             }   
          });
      
        
      }
      
      //si on choisir partager le write authorization a utilsateur
      else if(this.auth=="canWrite")
      {
          this.listService.getOneList(this.listId).subscribe(async (data:any)=>{
          this.canRead= data.canRead;
          this.canWrite=data.canWrite;
          if( this.canRead.indexOf(this.shareForm.get('email').value)!=-1){
      
            const toast = this.toastCtrl.create({
              message: 'this list is already in the canRead list of the user '+this.shareForm.get('email').value,
              duration: 5000,
              position: 'middle',
              color:'danger'
            });
            (await toast).present();
             
             
          }
          else if( this.canWrite.indexOf(this.shareForm.get('email').value)!=-1){
      
            // const toast = this.toastCtrl.create({
            //   message: 'you have already shared the write authorization to the user '+this.shareForm.get('email').value,
            //   duration: 5000,
            //   position: 'middle',
            //   color:'danger'
            // });
            // (await toast).present();  
            this.modalContrl.dismiss(); 
          }
          
          else{
            await this.listService.shareWriteList(this.listId, this.shareForm.get("email").value);
            this.modalContrl.dismiss();
            location.reload();
          }   
        });
      }
      //si on chosit rien
      else{
        const toast = this.toastCtrl.create({
          message: 'You need to choose a authorization to share',
          duration: 5000,
          position: 'middle',
          color:'danger'
        });
        (await toast).present();   

      }
       
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
