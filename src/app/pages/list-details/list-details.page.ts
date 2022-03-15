import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { EMPTY, Observable } from 'rxjs';
import { ShareComponent } from 'src/app/modals/share/share.component';
import { getAuth } from "firebase/auth";

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
  userEmail:string;
  //bind avec le checkbox 
  
   

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
    const auth = getAuth();
    const user = auth.currentUser;
    this.userEmail = user.email;


  }

  

  // deleteTodo(index) {
  //   this.listeService.deleteTodo(this.list.item,index);
  // }
  
  deleteTodo(todoId:string) {
    this.listeService.deleteTodo(this.listId,todoId);
  }

  deleteReadUser(email:string)
  {
    this.listeService.deleteReadUser(this.listId,email);
  }

  deleteWriteUser(email:string)
  {
    this.listeService.deleteWriteUser(this.listId,email);
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

  async shareList() {
    const modal = await this.modalCtrl.create({
        component:ShareComponent,
        componentProps: {
          'listId' : this.listId
        }
    });

    await modal.present();
    
  }

  

  
  
  

}
