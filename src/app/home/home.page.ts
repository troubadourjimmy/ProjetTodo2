import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Lists = [];
   
  constructor(public listService:ListService, 
              public modalCtrl:ModalController,
              private authen:AuthentificationService,
              private toastCtrl:ToastController,
              private route:Router) {}
  
  ngOnInit(): void {
     this.Lists = this.listService.getLists();
  }

  delete(index){
      this.Lists.splice(index,1);
  }

  async addNewList() {
    const modal = await this.modalCtrl.create({
        component:CreateListComponent
    });

    await modal.present();
    this.Lists = this.listService.getLists();
  }

  async signout()
  {
    await this.authen.signout();
    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // the User still signed in.
      
    } else {//the user sign out
      
      const toast =await this.toastCtrl.create({
        message: 'sign out successfully',
        duration: 3000,
        position: 'middle',
        color:'light'
      });
      (await toast).present();
      this.route.navigate(['login']);
    }
   
  }
  
}
