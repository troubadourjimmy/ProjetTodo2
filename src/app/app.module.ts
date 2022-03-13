import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTodoComponent } from './modals/create-todo/create-todo.component';
import { ModifiTodoComponent } from './modals/modifi-todo/modifi-todo.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { ShareComponent } from './modals/share/share.component';

@NgModule({
  declarations: [AppComponent,CreateTodoComponent,ModifiTodoComponent,ShareComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,ReactiveFormsModule,  FormsModule,
            provideFirebaseApp(() => initializeApp(environment.firebase)), 
            provideAuth(() => getAuth()), 
            provideFirestore(() => getFirestore()), 
            provideStorage(() => getStorage()),  
            //ajouter pour eviter le problem:NullInjectorError: No provider for InjectionToken angularfire2.app.options!
            AngularFireModule.initializeApp(environment.firebase)      
            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
