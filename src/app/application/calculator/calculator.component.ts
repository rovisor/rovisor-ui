import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-claculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {
  retirementForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.retirementForm = this.fb.group({
      currentAge: [null, Validators.required],
      annualRate: [null, [Validators.required, Validators.min(0)]],
      retirementAge: [null, Validators.required],
      monthlyContribution: [null, Validators.required]
    });
  }
  CurrentAge: number | null = null;
  RetirementAge: number | null = null;
  MonthlyContribution: number | null = null;
  AnnualRate: number | null = null;
  Saving: number | null = null;
  ProjectedRetirementSavings: number = 0;
  TotalContributions: number = 0;
  TotalInterestEarned: number = 0;
  calculateEMI() {
  }
resetForm() {
    this.CurrentAge = null;
    this.RetirementAge = null;
    this.MonthlyContribution = null;
}


}
