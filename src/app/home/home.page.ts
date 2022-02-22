import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  Lists = [];
   
  constructor(public listService:ListService, public modalCtrl:ModalController) {}
  
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

  
}
