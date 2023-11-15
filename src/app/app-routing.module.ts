import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '', 
  component: AppComponent, 
  children: [ 
      { 
          path: 'auth', 
          loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
      }, 
      { 
          path: 'app', 
          loadChildren: () => import('./layout/layout.module').then(module => module.LayoutModule) 
      }] 
}];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
