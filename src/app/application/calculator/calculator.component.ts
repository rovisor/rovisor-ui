import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  retirementForm: FormGroup;

  ProjectedRetirementSavings: number = 0;
  TotalContributions: number = 0;
  TotalInterestEarned: number = 0;
  errorMessage: string = '';

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

      if (currentAge <= 0 || annualRate <= 0 || retirementAge <= 0 || monthlyContribution <= 0 || saving <= 0) {
        this.errorMessage = " All values must be greater than zero.";
        return; 
      }

      if (currentAge > retirementAge) {
        this.errorMessage = " Current Age must be less than Retirement Age.";
        return;
      }

      const yearToRtirement = (retirementAge - currentAge) ;
      const ratePerMonth = annualRate / 12;

      this.TotalContributions= 
      this.ProjectedRetirementSavings = (saving*(Math.pow(1 +(ratePerMonth),(12*yearToRtirement)))+monthlyContribution*(((Math.pow(1 +(ratePerMonth),(yearToRtirement * 12)))-1)/(ratePerMonth)));
      this.TotalContributions = (saving+monthlyContribution*12*yearToRtirement);
      this.TotalInterestEarned = this.ProjectedRetirementSavings - this.TotalContributions;

      this.errorMessage = '';
    } else {
      this.errorMessage = "Please fill out all required fields.";
    }
  }
  

  resetForm() {
    this.retirementForm.reset();
    this.ProjectedRetirementSavings = 0;
    this.TotalContributions = 0;
    this.TotalInterestEarned = 0;
    this.errorMessage = '';
  }
}
