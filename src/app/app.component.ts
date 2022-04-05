import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // this.initializeApp();
  }
  
  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     GoogleAuth.initialize()
  //   })
  // }
}
