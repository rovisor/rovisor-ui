import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';

const routes: Routes = [
  {
    path:'',
    component:ApplicationComponent,
    children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
        }, {
          path: 'registration-v2',
          component: RegistrationV2Component,
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
