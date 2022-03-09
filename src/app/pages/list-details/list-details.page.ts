import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public list: List;
  Todos:Todo[];
  listId:string;
  List$: Observable<List>= EMPTY;
   

  constructor(private modalCtrl:ModalController,
              private listeService:ListService,
              private actRou:ActivatedRoute) {}

  ngOnInit():void {
    
    //Obtenir le paramètre de routage listId
    const listId=this.actRou.snapshot.paramMap.get('listId');
    // this.list=this.listeService.getOne(listId);

    //this.List$ = this.listeService.getOneList(this.actRou.snapshot.params.id);
    this.List$ = this.listeService.getOneList(listId);
    this.listId = listId;
  }

  

  // deleteTodo(index) {
  //   this.listeService.deleteTodo(this.list.item,index);
  // }
  
  deleteTodo(todoId:string) {
    this.listeService.deleteTodo(this.listId,todoId);
  }

  async addNewTodo() {
    const modal = await this.modalCtrl.create({
        component:CreateTodoComponent,
        componentProps: {
          'listId' : this.listId
        }
    });

    await modal.present();
    
  }
  
}
