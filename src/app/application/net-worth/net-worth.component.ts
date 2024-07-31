import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-MortgageCalculator',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.css']
})
export class NetWorthComponent {
  netWorthForm: FormGroup; 

  Liabilities: number = 0;
  worth: number = 0;
  test: number = 0;
  assets: number = 0;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.netWorthForm = this.fb.group({
      Cash: [null, Validators.required],
      CheckingAccount: [null, Validators.required],
      SavingsAccount: [null, Validators.required],
      RetirementAccounts: [null, Validators.required],
      RealEstate: [null, Validators.required],
      Vehicles: [null, Validators.required],
      Other: [null, Validators.required],
      CreditCardDebt: [null, Validators.required],
      InvestmentAccounts : [null ,Validators.required],
      StudentLoans: [null, Validators.required],
      Mortgage: [null, Validators.required],
      CarLoan: [null, Validators.required],
      OtherLiabilities: [null, Validators.required],
    });
  }

  calculate() {
    if (this.netWorthForm.valid) { 
      const Cash = this.netWorthForm.value.Cash; 
      const CheckingAccount = this.netWorthForm.value.CheckingAccount; 
      const SavingsAccount = this.netWorthForm.value.SavingsAccount; 
      const RetirementAccounts = this.netWorthForm.value.RetirementAccounts; 
      const InvestmentAccounts = this.netWorthForm.value.InvestmentAccounts; 
      const RealEstate = this.netWorthForm.value.RealEstate; 
      const Vehicles = this.netWorthForm.value.Vehicles; 
      const Other = this.netWorthForm.value.Other; 

      if (Cash <= 0 || CheckingAccount <= 0 || SavingsAccount <= 0 || RetirementAccounts < 0 || RealEstate < 0 || Vehicles<=0 || Other<=0) {
        this.errorMessage = "All values must be greater than zero.";
        return;
      }

     

      const CreditCardDebt = this.netWorthForm.value.CreditCardDebt; 
      const StudentLoans = this.netWorthForm.value.StudentLoans; 
      const Mortgage = this.netWorthForm.value.Mortgage; 
      const CarLoan = this.netWorthForm.value.CarLoan; 
      const OtherLiabilities = this.netWorthForm.value.OtherLiabilities; 

      if (CreditCardDebt <= 0 || StudentLoans <= 0 || Mortgage <= 0 || CarLoan <= 0 || OtherLiabilities < 0) {
        this.errorMessage = "All values must be greater than zero.";
        return;
      }

    
      this.assets = (Cash+CheckingAccount+SavingsAccount+RetirementAccounts+ InvestmentAccounts+RealEstate+Vehicles+Other);

      this.worth  = (this.assets-this.Liabilities);

      this.Liabilities = (CreditCardDebt+StudentLoans+Mortgage+CarLoan+OtherLiabilities);

      this.errorMessage = '';
    } else {
      this.errorMessage = "Please fill out all required fields.";
    }
  }

  resetForm() {
    this.netWorthForm.reset(); 
    this.Liabilities = 0;
    this.worth= 0;
    this.assets =0;
    this.errorMessage = '';
  }
}
