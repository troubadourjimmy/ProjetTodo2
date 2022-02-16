import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTodoComponent } from './modals/create-todo/create-todo.component';
import { ModifiTodoComponent } from './modals/modifi-todo/modifi-todo.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent,CreateTodoComponent,ModifiTodoComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            ReactiveFormsModule,
            // AngularFireModule.initializeApp(environment.firebase),
            // AngularFireAnalyticsModule,
            // AngularFirestoreModule
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
