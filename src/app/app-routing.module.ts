import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo,emailVerified, AuthPipeGenerator } from '@angular/fire/compat/auth-guard';
import {AuthGuard} from '@angular/fire/auth-guard';
import { reauthenticateWithRedirect } from '@angular/fire/auth';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


//If we need to redirect an unauthorized user to our login page but 
//also redirect an authorized user who has not verified their email to a different page 
const redirectUnauthorizedOrUnverifiedUser: AuthPipeGenerator = () =>
  map(user => {
    if (user) {
      if (user.emailVerified) {
        return true
      } else {
        return ['login']
      }
    } else {
      return ['login']
    }
  })

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //les utilisateurs non authentifiés ne sont pas autorisés à naviguer vers homepage
    canActivate: [AngularFireAuthGuard],
    //data: { authGuardPipe: redirectUnauthorizedToLogin}
    data: { authGuardPipe: redirectUnauthorizedOrUnverifiedUser }
  },
  {
    //pour aller au page login comme le premier page lorsque entrer le app
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'list-details/:listId',
    loadChildren: () => import('./pages/list-details/list-details.module').then( m => m.ListDetailsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'list-details/:listId/todo-details/:todoId',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    
    
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
