import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public list: List;
  Todos:Todo[];
  // Todo1: Todo = {name:'manger', descrip: 'prepar du riz',status:false};


  constructor(private modalCtrl:ModalController,
              private listeService:ListService,
              private actRou:ActivatedRoute) {}

  ngOnInit() {
    //  this.stockList=this.routeInfo.snapshot.queryParams['list'];
    //  this.Todos = this.stockList.item;
    //  console.log(this.stockList.name);
    //Obtenir le paramètre de routage listId
    const listId=this.actRou.snapshot.paramMap.get('listId');
    this.list=this.listeService.getOne(listId);
  }

  //erreur
  // deleteTodo(index)
  // {
  //     this.list.item.splice(index,1);
  // }
  deleteTodo(index) {
    this.listeService.deleteTodo(this.list.item,index);
  }

  async addNewTodo() {
    const modal = await this.modalCtrl.create({
        component:CreateTodoComponent,
        componentProps: {
          'listId' : this.list.id
        }
    });

    await modal.present();
    
  }
  
}
