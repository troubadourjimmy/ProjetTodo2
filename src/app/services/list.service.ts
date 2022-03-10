import { Injectable } from '@angular/core';
//import { Firestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import * as Firestore from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { TodoDetailsPageRoutingModule } from '../pages/todo-details/todo-details-routing.module';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc, deleteDoc } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  Lists$:Firestore.CollectionReference<List>;
  Lists:List[];
  ListCollection: AngularFirestoreCollection<List>;
  
  
  public lists: Observable<List[]>;
 
  constructor(private firestore:Firestore.Firestore,
              private afs:AngularFirestore
                     ) {
      //this.Lists=[];
      this.Lists$ = Firestore.collection(firestore,'todoLists') as Firestore.CollectionReference<List>;
      this.ListCollection = afs.collection<List>('todoLists')
      
  }

  getLists(): Observable<List[]>{
    return Firestore.collectionData<List>(this.Lists$,{idField:'id'});
  }

  // //trouver le list choist
  getOne(id:string):List {
    return this.Lists.find(element=>element.id === id);
  }
 
  //trouver le list choist
  getOneList(ListId: string):Observable<List>
  {
    //`todoLists/${ListId} est le chemain dans firebase
    const doc = Firestore.doc(this.firestore, `todoLists/${ListId}`) as Firestore.DocumentReference<List>;
    const todosCollection$ = Firestore.collection(this.firestore,`todoLists/${ListId}/todos`) as Firestore.CollectionReference<Todo>;
    return Firestore.docData<List>(doc,{ idField: 'id'}).pipe(
      switchMap(list => Firestore.collectionData<Todo>(todosCollection$, {idField: 'id'}).pipe(
        map(todos =>({
          ...list,
          todos
        }))
      ))
    )


  }

   

  //creer une nouvelle list 
  // addList(list:List) {
  //   this.Lists.push(list);
  // }
  
  //lors du développement avec un langage qui compile en JavaScript, on ne pouvez pas utiliser d'objets personnalisés. 
  //Au lieu de cela, on doit utiliser des objets JavaScript purs à enregistrer dans la base de données Firestore.
  // si on fait return Firestore.addDoc(this.Lists$,list),il y a une error:invalid data. Data must be an object, but it was: a custom User object;
  //Object.assign() convertir la liste en objet
  async addList(list:List):Promise<Firestore.DocumentReference<List>>
  {
     return Firestore.addDoc(this.Lists$,Object.assign({}, list));
  
  }

  
  // deleteList(list:List)
  // {
  //    this.ListCollection.doc(list.id).delete();
     
  //  }

   async deleteList(ListId:String){
    const doc = Firestore.doc(this.firestore, `todoLists/${ListId}`) as Firestore.DocumentReference<List>;
    return Firestore.deleteDoc(doc);
   }

  //creer une nouvelle todo dans un list chosie
  // addTodo(id:string,todo:Todo) {
  //   this.getOne(id).item.push(todo);
  // }

  //creer une nouvelle todo dans un list chosie
  addTodo(ListId:string,todo:Todo) {
    //this.getOne(id).item.push(todo);
    //const doc = Firestore.doc(this.firestore, `todoLists/${ListId}`) as Firestore.DocumentReference<List>;
    const todosCollection$ = Firestore.collection(this.firestore,`todoLists/${ListId}/todos`) as Firestore.CollectionReference<Todo>;
    return Firestore.addDoc(todosCollection$,Object.assign({}, todo));
  }

  // deleteTodo(todo:Todo[],index:number) {
  //   todo.splice(index,1);
  // }

  async deleteTodo(ListId:string, todoId:string)
  {
    const doc = Firestore.doc(this.firestore, `todoLists/${ListId}/todos/${todoId}`) as Firestore.DocumentReference<Todo>;
    return Firestore.deleteDoc(doc);
  }

  //trouver un todo chosit dans un list
  // getTodo(listId:string, todoId:string):Todo {
  //    return this.getOne(listId).todos.find(element=>element.id === todoId);
  // }
   

  getOneTodo(listId:string, todoId:string):Observable<Todo> {
    const doc = Firestore.doc(this.firestore, `todoLists/${listId}/todos/${todoId}`) as Firestore.DocumentReference<Todo>;
    //const todosCollection$ = Firestore.collection(this.firestore,`todoLists/${listId}/todos`) as Firestore.CollectionReference<Todo>;
    return Firestore.docData<Todo>(doc,{ idField: 'id'}).pipe(   
        map(todo =>({
          ...todo
        }))
      )
    
     
  }

  async modifierTodo(ListId:string, todoId:string,todoName:string,TodoDescip:string)
  {

    const doc = Firestore.doc(this.firestore, `todoLists/${ListId}/todos/${todoId}`) as Firestore.DocumentReference<Todo>;
    Firestore.updateDoc(doc,{name:todoName,description:TodoDescip});
  }



}
