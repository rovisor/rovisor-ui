import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Registration1Component } from './registration-1/registration-1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadStatementComponent } from './upload-statement/upload-statement.component';
import { ConsolidateStatementComponent } from './consolidate-statement/consolidate-statement.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccountMappingComponent } from './account-mapping/account-mapping.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { DebttoIncomeRatioCalculatorComponent } from './diratio-calculator/diratio-calculator.component';
import { SimpleInterestCalculatorComponent } from './si-calculator/si-calculator.component';
import { LeaseVsBuyComponent } from './Lease-vs-Buy Calculator/Lease-vs-Buy.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { CreditCardPayoffCalculatorComponent } from './Credit-Card-Payoff-Calculator/Credit-Card-Payoff-Calculator.component';
import { SavingCalculatorComponent } from './saving-calculator/saving-calculator.component';
import { MortgageCalculatorComponent } from './MortgageCalculator/MortgageCalculator.component';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import { compoundIntresetComponent } from './compoundIntreset/compoundIntreset.component';
import { InvestmentCalculatorComponent } from './InvestmentCalculator/InvestmentCalculator.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HomeAffordabilityComponent } from './homeaffordability-calculator/homeaffordability-calculator.component';
import { BreakEvenCalculatorComponent } from './BreakEvenCalculator/BreakEvenCalculator.component';
import { EmergencyFundComponent } from './Emergency-Fund/Emergency-Fund.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    Registration1Component,
    RegistrationV2Component,
    UploadStatementComponent,
    ConsolidateStatementComponent,
    CreditCardPayoffCalculatorComponent,
    InvestmentCalculatorComponent,
    AccountMappingComponent,
    AddAccountComponent,
    DashboardComponent,
    DebttoIncomeRatioCalculatorComponent,
    CalculatorComponent,
    AccountDetailsComponent,
    HomeAffordabilityComponent,
    LoanCalculatorComponent,
    SavingCalculatorComponent,
    EmiCalculatorComponent,
    SimpleInterestCalculatorComponent,
    LeaseVsBuyComponent,
    MortgageCalculatorComponent,
    compoundIntresetComponent,
    EmergencyFundComponent,
    BreakEvenCalculatorComponent,
  ],
  imports: [
    NgbDatepickerModule,
    ApplicationRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    NgbModule
  ],
})
export class ApplicationModule { }
