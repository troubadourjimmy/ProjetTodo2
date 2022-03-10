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
  todo:Todo;
  name:string;
  description:string;

  ModiTodoForm: FormGroup;
  constructor(private fb:FormBuilder,
              private listeService:ListService,
              private modalContrl:ModalController){}

  ngOnInit() {
    //this.todo = this.listeService.getOneTodo(this.listId,this.todoId);
    this.listeService.getOneTodo(this.listId,this.todoId).subscribe(result=>{this.name = result.name});
    this.listeService.getOneTodo(this.listId,this.todoId).subscribe(result=>{this.description = result.description});
    console.log(this.todoId)
    //afficher le todo pour modifier
    this.ModiTodoForm = this.fb.group({
         
        //name: [this.listeService.getOneTodo(this.listId,this.todoId).subscribe(result=>{ this.name= result.name}),[Validators.required,Validators.minLength(3)]],
        name: [this.name,[Validators.required,Validators.minLength(3)]],
       // descrip: [this.listeService.getOneTodo(this.listId,this.todoId).description,[Validators.required,Validators.maxLength(150)]]
        descrip: [this.description,[Validators.required,Validators.maxLength(150)]]
    });
  }

  //modifier le todo et verifier
  verifiModification() {
    //  this.listeService.getOneTodo(this.listId,this.todoId).name =this.ModiTodoForm.get("name").value;
    //  this.listeService.getOneTodo(this.listId,this.todoId).description =this.ModiTodoForm.get("descrip").value;
    this.listeService.modifierTodo(this.listId,this.todoId,this.ModiTodoForm.get("name").value, this.ModiTodoForm.get("descrip").value)
    this.modalContrl.dismiss();
  }


}
