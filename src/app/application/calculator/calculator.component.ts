import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  retirementForm: FormGroup;

  CurrentAge: number | null = null;
  RetirementAge: number | null = null;
  MonthlyContribution: number | null = null;
  AnnualRate: number | null = null;
  Saving: number | null = null;

  ProjectedRetirementSavings: number = 0;
  TotalContributions: number = 0;
  TotalInterestEarned: number = 0;

  constructor(private fb: FormBuilder) {
    this.retirementForm = this.fb.group({
      currentAge: [null, Validators.required],
      annualRate: [null, [Validators.required, Validators.min(0)]],
      retirementAge: [null, Validators.required],
      monthlyContribution: [null, Validators.required],
      saving: [null, Validators.required]
    });
  }

  calculateEMI() {
    if (this.retirementForm.valid) {
      const currentAge = this.retirementForm.value.currentAge;
      const annualRate = this.retirementForm.value.annualRate / 100;
      const retirementAge = this.retirementForm.value.retirementAge;
      const monthlyContribution = this.retirementForm.value.monthlyContribution;
      const saving = this.retirementForm.value.saving;

      const monthsToRetirement = (retirementAge - currentAge) * 12;
      const ratePerMonth = annualRate / 12;
      const compoundFactor = Math.pow(1 + ratePerMonth, monthsToRetirement);

     
      const futureValueOfSavings = saving * compoundFactor;

     
      const futureValueOfContributions = monthlyContribution * ((compoundFactor - 1) / ratePerMonth) * (1 + ratePerMonth);

      
      this.ProjectedRetirementSavings = futureValueOfSavings + futureValueOfContributions;
      this.TotalContributions = monthlyContribution * monthsToRetirement;
      this.TotalInterestEarned = this.ProjectedRetirementSavings - this.TotalContributions - saving;
    }
  }

  resetForm() {
    this.retirementForm.reset();
    this.CurrentAge = null;
    this.RetirementAge = null;
    this.MonthlyContribution = null;
    this.AnnualRate = null;
    this.Saving = null;
    this.ProjectedRetirementSavings = 0;
    this.TotalContributions = 0;
    this.TotalInterestEarned = 0;
  }
}
