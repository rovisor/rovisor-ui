import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-claculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {

  CurrentAge: number | null = null;
  RetirementAge: number | null = null;
  MonthlyContribution: number | null = null;
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
