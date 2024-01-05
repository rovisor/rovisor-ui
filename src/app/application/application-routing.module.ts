import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Registration1Component } from './registration-1/registration-1.component';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';
import { UploadStatementComponent } from './upload-statement/upload-statement.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'registration',
        component: Registration1Component,
      },
     {
        path: 'registration-v2',
        component: RegistrationV2Component,
      },
      {
        path: 'upload-statement',
        component: UploadStatementComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
