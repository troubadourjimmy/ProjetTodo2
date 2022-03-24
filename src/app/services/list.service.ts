import { Injectable } from '@angular/core';
//import { Firestore } from '@angular/fire/firestore';
import { element } from 'protractor';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import * as Firestore from '@angular/fire/firestore'
import { async, combineLatest, Observable } from 'rxjs';
import { TodoDetailsPageRoutingModule } from '../pages/todo-details/todo-details-routing.module';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { AuthentificationService } from './authentification.service';
import { getAuth } from "firebase/auth";
import { ToastController } from '@ionic/angular';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  Lists$:Firestore.CollectionReference<List>;
  Lists:List[];
  ListCollection: AngularFirestoreCollection<List>;
  canRead:string[];
  addlist:any;
  id:string;
   
  
  
  public lists: Observable<List[]>;
 
  constructor(private firestore:Firestore.Firestore,
              private afs:AngularFirestore,
              private authService: AuthentificationService
              
                     ) {
      //this.Lists=[];
      this.Lists$ = Firestore.collection(firestore,'todoLists') as Firestore.CollectionReference<List>;
      this.ListCollection = afs.collection<List>('todoLists')
      
  }

  getOwnerLists(): Observable<List[]>{
    //Obtenir l'utilisateur actuellement connecté
    const auth = getAuth();
    const user = auth.currentUser;
    
    const owner$ = this.afs.collection<List>('todoLists',ref => ref.where('owner','==', user.email)).valueChanges({idField:'id'});
    console.log(user.email);
    //const reader$ = this.afs.collection<List>('todoLists',ref => ref.where('canRead','==', user.email)).valueChanges({idField:'id'});
    //const writer$ = this.afs.collection<List>('todoLists',ref => ref.where('canWrite','==', user.email)).valueChanges({idField:'id'});
    //return combineLatest([owner$,reader$,writer$]).pipe(map(([owner,reader,writer]) => owner.concat(reader).concat(writer)));
    return owner$;
    //return Firestore.collectionData<List>(this.Lists$,{idField:'id'});
  }

  //obtenir les lists qu'on peut lire pour l'utilisateur connecte
  getReadLists(): Observable<List[]>{
    //Obtenir l'utilisateur actuellement connecté
    const auth = getAuth();
    const user = auth.currentUser;
    //"array-contains" est different que '==' dans getOwnerLists(), parcque owner a seulement une user.email, 
    //mais dans canRead et canWrite ont plusieurs user.email.
    const reader$ = this.afs.collection<List>('todoLists',ref => ref.where('canRead',"array-contains", user.email)).valueChanges({idField:'id'});
  
    return reader$;
     
  }

  
  ////obtenir les lists qu'on peut ecrire/modifier pour l'utilisateur connecte
  getWriteLists(): Observable<List[]>{
    //Obtenir l'utilisateur actuellement connecté
    const auth = getAuth();
    const user = auth.currentUser;
    const writer$ = this.afs.collection<List>('todoLists',ref => ref.where('canWrite',"array-contains", user.email)).valueChanges({idField:'id'});
     
    return writer$;
    //return Firestore.collectionData<List>(this.Lists$,{idField:'id'});
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
  // async addList2(list:List):Promise<Firestore.DocumentReference<List>>
  // {
     
  //    const auth = getAuth();
  //    const user = auth.currentUser;
  //    list.owner = user.email;
  //    return Firestore.addDoc(this.Lists$,Object.assign({}, list));
  // }

  async addList(list:List)
  {
     
     const auth = getAuth();
     const user = auth.currentUser;
     list.owner = user.email;
     await this.ListCollection.add({ ...list })
     .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
     //ajouter le meme id dans le  doc list, pour la fonction searchList
     Firestore.updateDoc(docRef,{id:docRef.id});  
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
     });
     
  }

  
  // deleteList(list:List)
  // {
  //    this.ListCollection.doc(list.id).delete();
     
  //  }

  //  async deleteList(ListId:string){
  //   //this.afs.doc
  //   const doc = Firestore.doc(this.firestore, `todoLists/${ListId}`) as Firestore.DocumentReference<List>;
  //   return Firestore.deleteDoc(doc);
  //  }

   async deleteList(ListId: string) {
    //supprime tous les todos de la nested collection:
    const querySnapshotTodosDocs = this.ListCollection.doc(ListId).collection("todos").ref.get();
    querySnapshotTodosDocs.then(
      async querySnapshot => {
       
        const promiseDocDeleted = querySnapshot.docs.map(
          doc => doc.ref.delete()
        )
        
        await Promise.all(promiseDocDeleted)
      }
    )
    this.ListCollection.doc(ListId).delete();
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
    await Firestore.updateDoc(doc,{name:todoName,description:TodoDescip});
  }

  //modifier le ListName
  async modifierList(ListId:string, ListName:string)
  {
    const doc = Firestore.doc(this.firestore, `todoLists/${ListId}`) as Firestore.DocumentReference<List>;
    await Firestore.updateDoc(doc,{name:ListName});
  }

  // modifier le todo.done pour le checkbox
  async modifierTodoDone(ListId:string, todoId:string,TodoDone:boolean)
  {
    const doc = Firestore.doc(this.firestore, `todoLists/${ListId}/todos/${todoId}`) as Firestore.DocumentReference<Todo>;
    await Firestore.updateDoc(doc,{done:TodoDone});
  }

 //ajouter l'email to shareRead dans firestore
  async shareReadList(ListId:string,email:string)
 {
   const list = Firestore.doc(this.firestore,`todoLists/${ListId}`) as Firestore.DocumentReference<List>;
   await updateDoc(list,{canRead:arrayUnion(email)});
    
 }

 ////ajouter l'email to shareWrite dans firestore
 async shareWriteList(ListId:string,email:string)
 {
    const list = Firestore.doc(this.firestore,`todoLists/${ListId}`) as Firestore.DocumentReference<List>;
     await updateDoc(list,{canWrite:arrayUnion(email)});    
 }

 async deleteReadUser(ListId:string,email:string)
 {
  const list = Firestore.doc(this.firestore,`todoLists/${ListId}`) as Firestore.DocumentReference<List>;
  await updateDoc(list,{canRead:arrayRemove(email)}); 
 }

 async deleteWriteUser(ListId:string,email:string)
 {
  const list = Firestore.doc(this.firestore,`todoLists/${ListId}`) as Firestore.DocumentReference<List>;
  await updateDoc(list,{canWrite:arrayRemove(email)}); 
 }

}
