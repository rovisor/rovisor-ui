import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Registration1Component } from './registration-1/registration-1.component';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';
import { ConsolidateStatementComponent } from './consolidate-statement/consolidate-statement.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { DebttoIncomeRatioCalculatorComponent } from './diratio-calculator/diratio-calculator.component';
import { SimpleInterestCalculatorComponent } from './si-calculator/si-calculator.component';import { LeaseVsBuyComponent } from './Lease-vs-Buy Calculator/Lease-vs-Buy.component';import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { CreditCardPayoffCalculatorComponent } from './Credit-Card-Payoff-Calculator/Credit-Card-Payoff-Calculator.component';import { SavingCalculatorComponent } from './saving-calculator/saving-calculator.component';import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';import { compoundIntresetComponent } from './compoundIntreset/compoundIntreset.component';
import { InvestmentCalculatorComponent } from './InvestmentCalculator/InvestmentCalculator.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { BreakEvenCalculatorComponent } from './BreakEvenCalculator/BreakEvenCalculator.component';
import { MortgageCalculatorComponent } from './MortgageCalculator/MortgageCalculator.component';
import { EmergencyFundComponent } from './Emergency-Fund/Emergency-Fund.component';
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
        path: 'InvestmentCalculator',
        component: InvestmentCalculatorComponent,
     },
      {
        path: 'Credit-Card-Payoff-Calculator',
        component: CreditCardPayoffCalculatorComponent,
      },
      {
        path: 'saving-calculator',
        component: SavingCalculatorComponent,
      },
      {
        path: 'Emergency-Fund',
        component: EmergencyFundComponent,
      },
      {
        path: 'diratio-calculator',
        component: DebttoIncomeRatioCalculatorComponent,
      },
      {
         path: 'accounts/:id',
         component: AccountDetailsComponent,
     },
      {
        path: 'si-calculator',
        component: SimpleInterestCalculatorComponent,
       },
      {
        path: 'loan-calculator',
        component: LoanCalculatorComponent,
      },
      {
        path: 'emi-calculator',
        component: EmiCalculatorComponent,
      },
      {
         path: 'accounts/:id',
         component: AccountDetailsComponent,
      },
      {
        path: 'Lease-vs-Buy',
        component: LeaseVsBuyComponent,
      },
      {
        path: 'MortgageCalculator',
        component: MortgageCalculatorComponent,
      },
      {
        path: 'compoundIntreset',
        component: compoundIntresetComponent,
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
      },
      {
        path : 'BreakEvenCalculator',
        component: BreakEvenCalculatorComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ApplicationRoutingModule { }
