import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import {Observable} from "rxjs";
import * as Firestore from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  Lists:List[];
  items$: Firestore.CollectionReference<List>;


  constructor() {
      this.Lists=[];
      this.items$ = Firestore.collection(firestore,'playlists') as Firestore.CollectionReference<List>;
  }

  getLists():List[] {
    return this.Lists;
  }
/*
  getAll():Observable<List[]>{

  }

 */
  //trouver le list choist
  getOne(id:string):List {
    return this.Lists.find(element=>element.id === id);
  }

  //creer une nouvelle list 
  addList(list:List) {
    this.Lists.push(list);
  }

  //creer une nouvelle todo dans un list chosie
  addTodo(id:string,todo:Todo) {
    this.getOne(id).item.push(todo);
  }

  deleteTodo(todo:Todo[],index:number) {
    todo.splice(index,1);
  }

  //trouver un todo chosit dans un list
  getTodo(listId:string, todoId:string):Todo {
     return this.getOne(listId).item.find(element=>element.id === todoId);
  }



}
