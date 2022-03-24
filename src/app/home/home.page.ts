import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { ModalController, ToastController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";
import { EMPTY, Observable } from 'rxjs';
import { List } from '../models/list';
import { ModifierListComponent } from '../modals/modifier-list/modifier-list.component';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Todo } from '../models/todo';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  OwnerLists$:Observable<List[]>= EMPTY;
  ReadLists$:Observable<List[]>= EMPTY;
  WriteLists$:Observable<List[]>= EMPTY;
  search$:Observable<List[]> =EMPTY;
  Lists:any;
  userEmail:string;
  /////////////////
  sampleArr =[];
  resultArr=[];
  //pour decider aifficher le result de search list
  searching:boolean;
  
   
  constructor(public listService:ListService, 
              public modalCtrl:ModalController,
              private authen:AuthentificationService,
              private toastCtrl:ToastController,
              private route:Router,
              private afs:AngularFirestore) {}
  
  ngOnInit(): void {
     this.OwnerLists$ = this.listService.getOwnerLists();
     this.ReadLists$ = this.listService.getReadLists();
     this.WriteLists$ = this.listService.getWriteLists();
     //console.log(this.keyValue)
     
     ////Obtenir les info d'utilisateur actuellement connecté
     const auth = getAuth();
     const user = auth.currentUser;
     this.userEmail=user.email;
  }

   
  delete(id:string){
    //this.Lists.splice(index,1);
    this.listService.deleteList(id);
  }


  

  async addNewList() {
    const modal = await this.modalCtrl.create({
        component:CreateListComponent
    });

    await modal.present();
    //this.Lists = this.listService.getLists();
  }

 

  async signout()
  {
    await this.authen.signout();
    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // the User still signed in.
      
    } else {//the user sign out
      
      const toast =await this.toastCtrl.create({
        message: 'sign out successfully',
        duration: 3000,
        position: 'middle',
        color:'light'
      });
      (await toast).present();
      this.route.navigate(['login']);
    }
   
  }


  search(event){
    
    this.searching=true;
    let searchKey:string = event.target.value; 
    
     //toUpperCase():Convertir tous les caractères en majuscules
     //let firstLetter = searchKey.toUpperCase();
     console.log(searchKey)
     if(searchKey.length==0)
     {
        this.searching=false;
        this.sampleArr=[];
        this.resultArr=[];   
     }

    
     if(this.sampleArr.length ==0)
     {
       
       this.afs.collection<List>('todoLists',ref=>(ref.where('name', '>=',searchKey))&&ref.where('owner', '==',this.userEmail)).snapshotChanges()
        .subscribe(data =>{
          data.forEach(childData=>{
            this.sampleArr.push(childData.payload.doc.data()
            )
          })
        })
     }
     else{
       this.resultArr=[];
       this.sampleArr.forEach(val=>{
         let name:string=val['name'];
         if(name.indexOf(searchKey)>=0){
            this.resultArr.push(val);
         }
       })
     }
  }

  deleteUserCanRead()
  {

  }

  deleteUserCanWrite()
  {

  }



 }
