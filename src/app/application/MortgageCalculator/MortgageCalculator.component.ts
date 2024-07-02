import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-MortgageCalculator',
  templateUrl: './MortgageCalculator.component.html',
  styleUrls: ['./MortgageCalculator.component.css']
})
export class MortgageCalculatorComponent {
  
MortageCalculatorForm: FormGroup;

  ProjectedRetirementSavings: number = 0;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.MortageCalculatorForm = this.fb.group({
      loanAmount: [null, Validators.required],
      annualRate: [null, [Validators.required,]],
      time : [null, Validators.required],
    });
  }

  calculate() {
    if (this.MortageCalculatorForm.valid) {
      const loanAmount = this.MortageCalculatorForm.value.loanAmount;
      const annualRate = this.MortageCalculatorForm.value.annualRate ;
      const time = this.MortageCalculatorForm.value.time;

      if (loanAmount <= 0 || annualRate <= 0 || time <= 0) {
        this.errorMessage = " All values must be greater than zero.";
        return; 
      }


      const lonaTerm = (time*12) ;
      const ratePerMonth = annualRate / 12;

      this.ProjectedRetirementSavings = (loanAmount*((ratePerMonth*(Math.pow(1 +(ratePerMonth),(lonaTerm))))/(((Math.pow(1 +(ratePerMonth),(lonaTerm)))-1))));

      this.errorMessage = '';
    } else {
      this.errorMessage = "Please fill out all required fields.";
    }
  }
  

  resetForm() {
    this.MortageCalculatorForm.reset();
    this.ProjectedRetirementSavings = 0;
    this.errorMessage = '';
  }
}