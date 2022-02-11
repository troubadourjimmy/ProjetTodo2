import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalAnimationOptions } from '@ionic/core';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  @Input() listId:string;
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private listService: ListService, private modalCtrl:ModalController) 
  {
    this.todoForm = this.fb.group({
              name: ['',[Validators.required,Validators.minLength(3)]],
              descrip: ['',[Validators.required,Validators.maxLength(150)]]
            })
  }

  ngOnInit() {}


  addTodo()
  {
      if(this.todoForm.valid)
      {
        this.listService.addTodo(this.listId ,
                                new Todo( this.todoForm.get("name").value,this.todoForm .get("descrip").value)
                                );
        this.modalCtrl.dismiss();
      } ; 
       
  }

}
