import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '', 
  redirectTo: 'auth/sign-in',
  pathMatch: 'full'
},  
{ 
  path: 'auth', 
  loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
}, 
{ 
  path: 'app', 
  loadChildren: () => import('./application/application.module').then(module => module.ApplicationModule) 
}, 
{ 
  path: '**', 
  loadChildren: () => import('./not-found/not-found.module').then(module => module.NotFoundModule) 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
