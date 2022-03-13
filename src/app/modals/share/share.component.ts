import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  @Input() listId:string;
  shareForm: FormGroup;
  constructor(private fb: FormBuilder,
    private listService: ListService,
    private modalCtrl:ModalController) {
      this.shareForm = this.fb.group({
      canRead: ['',[Validators.required,Validators.minLength(0)]],
      canWrite: ['',[Validators.required,Validators.minLength(0)]]
  });
}

  ngOnInit() {}

  shareList()
  {

  }

}
