import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Registration1Component } from './registration-1/registration-1.component';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';
import { ConsolidateStatementComponent } from './consolidate-statement/consolidate-statement.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { LeaseVsBuyComponent } from './Lease-vs-Buy Calculator/Lease-vs-Buy.component';import { CalculatorComponent } from './calculator/calculator.component';

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
         path: 'consolidate-statement',
         component: ConsolidateStatementComponent,
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
     },
      {
         path: 'accounts/:id',
         component: AccountDetailsComponent,
      },
      {
        path: 'Lease-vs-Buy',
        component: LeaseVsBuyComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplicationRoutingModule { }
