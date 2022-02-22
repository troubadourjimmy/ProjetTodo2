import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModifiTodoComponent } from 'src/app/modals/modifi-todo/modifi-todo.component';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  
  todo:Todo;
  todoid:string;
  listid:string;
  constructor( private modalCtrl:ModalController,
               private listeService:ListService,
               private actRou:ActivatedRoute) { }

  ngOnInit() {
    const todoId=this.actRou.snapshot.paramMap.get('todoId');
    const listId=this.actRou.snapshot.paramMap.get('listId');
    this.todo=this.listeService.getTodo(listId,todoId);
    this.todoid = todoId;
    this.listid = listId;

  }

  //ouvrir la page modification-todo
  async modifiTodo() {
    const modal = await this.modalCtrl.create({
        component:ModifiTodoComponent,
        componentProps: {
          'listId':this.listid,
          'todoId' : this.todoid
        }
    });

    await modal.present();
    
  }

}
