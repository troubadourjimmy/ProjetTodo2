import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
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
  
  todoName:string;
  description:string;
  done:boolean;

  ModiTodoForm: FormGroup;
  constructor(private fb:FormBuilder,
              private listeService:ListService,
              private modalContrl:ModalController){}

  ngOnInit() {
     
    this.getValue();
    console.log(this.todoName);
    
    console.log(this.todoId);
  
    //afficher le todo detaille pour modifier
    this.ModiTodoForm = this.fb.group({   
        name: [,[Validators.required,Validators.minLength(3)]],
        descrip: [,[Validators.required,Validators.maxLength(150)]]
    });
  }

  //obtenir le todoName et descrip pour modifier
  getValue()
  {
    return this.listeService.getOneTodo(this.listId,this.todoId).subscribe((data:any)=>{
      this.todoName = data.name;
      this.description=data.description;
      console.log(this.todoName);
    });
  }

  //modifier le todo et verifier
  verifiModification() {
    //  this.listeService.getOneTodo(this.listId,this.todoId).name =this.ModiTodoForm.get("name").value;
    //  this.listeService.getOneTodo(this.listId,this.todoId).description =this.ModiTodoForm.get("descrip").value;
    this.listeService.modifierTodo(this.listId,this.todoId,this.ModiTodoForm.get("name").value, this.ModiTodoForm.get("descrip").value)
    this.modalContrl.dismiss();
  }

  cancle()
  {
    this.modalContrl.dismiss();
  }

  ModifierTodoDone()
  {
      this.listeService.modifierTodoDone(this.listId,this.todoId,this.done);
  }
}