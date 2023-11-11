import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '', 
  component: DashboardComponent,
},  
{ 
  path: 'auth', 
  loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
}, 
{ 
  path: 'dashboard', 
  loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule) 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
