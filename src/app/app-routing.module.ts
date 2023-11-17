import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '', 
  component: AppComponent,
},  
{ 
  path: 'auth', 
  loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
}, 
{ 
  path: 'app', 
  loadChildren: () => import('./application/application.module').then(module => module.ApplicationModule) 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
