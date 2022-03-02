import { Injectable } from '@angular/core';
//import { Firestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import * as Firestore from '@angular/fire/firestore'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  Lists$:Firestore.CollectionReference<List>
  Lists:List[];
 
  constructor(private firestore:Firestore.Firestore) {
      //this.Lists=[];
      this.Lists$ = Firestore.collection(firestore,'todoLists') as Firestore.CollectionReference<List>;
  }

  getLists(): Observable<List[]>{
    return Firestore.collectionData<List>(this.Lists$,{idField:'id'});
  }

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
