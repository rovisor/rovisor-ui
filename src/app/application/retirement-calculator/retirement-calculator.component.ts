import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-retirement-calculator',
  templateUrl: './retirement-calculator.component.html',
  styleUrls: ['./retirement-calculator.component.css']
})
export class RetirementCalculatorComponent implements OnInit {
  retirementForm: FormGroup;

  ProjectedRetirementSavings: number = 0;
  TotalContributions: number = 0;
  TotalInterestEarned: number = 0;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.retirementForm = this.fb.group({
      currentAge: [null, [Validators.required, Validators.min(1)]],
      annualRate: [null, [Validators.required, Validators.min(0.01)]],
      retirementAge: [null, [Validators.required, Validators.min(1)]],
      monthlyContribution: [null, [Validators.required, Validators.min(0)]],
      saving: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.retirementForm.valueChanges.subscribe(() => {
      this.resetCalculations();
    });
  }

  calculateRetirement() {
    if (this.retirementForm.valid) {
      const currentAge = this.retirementForm.value.currentAge;
      const annualRate = this.retirementForm.value.annualRate / 100;
      const retirementAge = this.retirementForm.value.retirementAge;
      const monthlyContribution = this.retirementForm.value.monthlyContribution;
      const saving = this.retirementForm.value.saving;

      if (currentAge <= 0 || annualRate <= 0 || retirementAge <= 0 || monthlyContribution < 0 || saving < 0) {
        this.errorMessage = "All values must be valid.";
        return;
      }

      if (currentAge > retirementAge) {
        this.errorMessage = "Current Age must be less than Retirement Age.";
        return;
      }

      const yearToRetirement = (retirementAge - currentAge);
      const ratePerMonth = annualRate / 12;

      this.TotalContributions = saving + (monthlyContribution * 12 * yearToRetirement);
      this.ProjectedRetirementSavings = (saving * (Math.pow(1 + ratePerMonth, (12 * yearToRetirement))) +
        monthlyContribution * (((Math.pow(1 + ratePerMonth, (yearToRetirement * 12))) - 1) / ratePerMonth));
      this.TotalInterestEarned = this.ProjectedRetirementSavings - this.TotalContributions;

      this.errorMessage = '';
    } else {
      this.errorMessage = "Please fill out all required fields.";
    }
  }

  resetForm() {
    this.retirementForm.reset({
      currentAge: null,
      annualRate: null,
      retirementAge: null,
      monthlyContribution: null,
      saving: null
    });
    this.resetCalculations();
    this.errorMessage = '';
  }

  resetCalculations() {
    this.ProjectedRetirementSavings = 0;
    this.TotalContributions = 0;
    this.TotalInterestEarned = 0;
  }
}
