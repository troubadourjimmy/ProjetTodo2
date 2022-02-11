import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modifi-todo',
  templateUrl: './modifi-todo.component.html',
  styleUrls: ['./modifi-todo.component.scss'],
})
export class ModifiTodoComponent implements OnInit {
  @Input() listId:string
  @Input() todoId:string


  ModiTodoForm: FormGroup;
  constructor(private fb:FormBuilder, private listeService:ListService, private modalContrl:ModalController){}

  ngOnInit() 
  {
    //afficher le todo pour modifier
    this.ModiTodoForm = this.fb.group
    ({
        name: [this.listeService.getTodo(this.listId,this.todoId).name,[Validators.required,Validators.minLength(3)]],
        descrip: [this.listeService.getTodo(this.listId,this.todoId).descrip,[Validators.required,Validators.maxLength(150)]]
    })
  }

  //modifier le todo et verifier
  verifiModification()
  {
    this.listeService.getTodo(this.listId,this.todoId).name =this.ModiTodoForm.get("name").value;
    this.listeService.getTodo(this.listId,this.todoId).descrip =this.ModiTodoForm.get("descrip").value;
    
    this.modalContrl.dismiss();
  }


}
