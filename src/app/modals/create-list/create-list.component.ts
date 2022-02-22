import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  listForm: FormGroup;

  constructor(private fb: FormBuilder,
              private listService: ListService,
              public modalCtrl:ModalController) {
      this.listForm = this.fb.group({name: ['',[Validators.required,Validators.minLength(3)]],});
  }

  ngOnInit() {
    this.listForm = this.fb.group({
        name: ['',Validators.required]
      }
    );
  }

  addList() {
    if(this.listForm.valid) {
      this.listService.addList(new List(this.listForm.get('name').value));
      this.modalCtrl.dismiss();  
    }
  }

}
