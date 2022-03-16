import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModifiTodoComponent } from 'src/app/modals/modifi-todo/modifi-todo.component';
import { List } from 'src/app/models/list';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  List$: Observable<List>;
  userEmail:string;
  //todo:Todo;
  todo:any;
  todoid:string;
  listid:string;
  //bind avec checkbox
  done:boolean;
  constructor( private modalCtrl:ModalController,
               private listeService:ListService,
               private actRou:ActivatedRoute) { }

  ngOnInit() {
    const todoId=this.actRou.snapshot.paramMap.get('todoId');
    const listId=this.actRou.snapshot.paramMap.get('listId');
    //this.todo=this.listeService.getTodo(listId,todoId);
    this.todo=this.listeService.getOneTodo(listId,todoId);
    this.todoid = todoId;
    this.listid = listId;
    this.List$ = this.listeService.getOneList(listId);
    const auth = getAuth();
    const user = auth.currentUser;
    this.userEmail =user.email;

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

  //// modifier le todo.done pour le checkbox
  ModifierTodoDone()
  {
      this.listeService.modifierTodoDone(this.listid,this.todoid,this.done);
  }

}
