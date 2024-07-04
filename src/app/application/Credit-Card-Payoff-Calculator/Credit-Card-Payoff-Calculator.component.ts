import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './Credit-Card-Payoff-Calculator.component.html',
  styleUrls: ['./Credit-Card-Payoff-Calculator.component.css']
})
export class CreditCardPayoffCalculatorComponent {
    payoffCalculatorForm: FormGroup;

    projectedMonths: number = 0;
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder) {
      this.payoffCalculatorForm = this.fb.group({
        Balance: [null, Validators.required],
        AnnualInterestRate: [null, Validators.required],
        MonthlyPayment: [null, Validators.required],
      });
    }
  
    calculate() {
      if (this.payoffCalculatorForm.valid) {
        const balance = this.payoffCalculatorForm.value.Balance;
        const annualInterestRate = this.payoffCalculatorForm.value.AnnualInterestRate;
        const monthlyPayment = this.payoffCalculatorForm.value.MonthlyPayment;
  
        if (balance <= 0 || annualInterestRate <= 0 || monthlyPayment <= 0) {
          this.errorMessage = "All values must be greater than zero.";
          return; 
        }
        
        const monthlyRate = annualInterestRate / 12 / 100;
        this.projectedMonths = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate)) / Math.log(1 + monthlyRate);
        this.errorMessage = '';
      } else {
        this.errorMessage = "Please fill out all required fields.";
      }
    }
  
    resetForm() {
      this.payoffCalculatorForm.reset();
      this.projectedMonths = 0;
      this.errorMessage = '';
    }
}
