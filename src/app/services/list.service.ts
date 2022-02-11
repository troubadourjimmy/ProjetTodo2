import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { List } from '../models/list';
import { Todo } from '../models/todo';

///////
@Injectable({
  providedIn: 'root'
})
export class ListService 
{
  Lists:List[];
 
  // Todo1: Todo = {name:'manger', descrip: 'prepar du riz',status:false};
  // Todo2: Todo = {name:'sport', descrip: 'faire du velo',status:false };
  // Lists: List[] = 
  //           [
  //             {
  //               name:'item1', 
  //               item: [this.Todo1,this.Todo2]
  //             },

  //             {
  //               name:'item2', 
  //               item: [this.Todo1, this.Todo2]
  //             },

  //             {
  //               name:'item3', 
  //               item: [this.Todo1, this.Todo2]
  //             },

  //             {
  //               name:'item4', 
  //               item: [this.Todo1, this.Todo2]
  //             }
  //         ];
  // Lists = 
  // [
  //   {
  //     itemName: 'item1'
  //   },

  //   {
  //     itemName: 'item2'
  //   },
  //   {
  //     itemName: 'item3'
  //   }

  // ];

  constructor() 
  { 
      this.Lists=[];
  }

  getLists():List[]
  {
    return this.Lists;
  }

  //trouver le list choist
  getOne(id:string):List
  {
    return this.Lists.find(element=>element.id === id);
  }

  //creer une nouvelle list 
  addList(list:List)
  {
    this.Lists.push(list);
  }

  //creer une nouvelle todo dans un list chosie
  addTodo(id:string,todo:Todo)
  {
    this.getOne(id).item.push(todo);
  }

  deleteTodo(todo:Todo[],index:number)
  {
    todo.splice(index,1);
  }

  //trouver un todo chosit dans un list
  getTodo(listId:string, todoId:string):Todo
  {
     return this.getOne(listId).item.find(element=>element.id === todoId);
  }



}
