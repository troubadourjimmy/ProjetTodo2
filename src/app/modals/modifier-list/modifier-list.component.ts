import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modifier-list',
  templateUrl: './modifier-list.component.html',
  styleUrls: ['./modifier-list.component.scss'],
})
export class ModifierListComponent implements OnInit {
  @Input() listId:string;

  listName:string;
  
  ModiListForm: FormGroup;
  constructor(
    private fb:FormBuilder,
    private listeService:ListService,
    private modalContrl:ModalController
  ) { }

  ngOnInit() {
    
    this,this.getValue();
    this.ModiListForm = this.fb.group({   
      name: [,[Validators.required,Validators.minLength(3)]]
  });

  }


  getValue()
  {
    return this.listeService.getOneList(this.listId).subscribe((data:any)=>{
      this.listName = data.name;
      
      console.log(this.listName);
    });
  }

  verifiModification()
  {
    this.listeService.modifierList(this.listId,this.ModiListForm.get("name").value)
    this.modalContrl.dismiss();
  }

  
  cancle()
  {
    this.modalContrl.dismiss();
  }

}
