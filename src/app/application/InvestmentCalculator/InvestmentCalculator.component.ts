import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './InvestmentCalculator.component.html',
  styleUrls: ['./InvestmentCalculator.component.css']
})
export class InvestmentCalculatorComponent {
    InvestmentCalculatorForm: FormGroup;

    Projectedcalculation: number = 0;
    annualizedROI: number =0;
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder) {
      this.InvestmentCalculatorForm = this.fb.group({
        InitialInvestment: [null, Validators.required],
        FinalValue: [null, Validators.required],
        Time: [null,Validators.required],
      });
    }
  
    calculate() {
      if (this.InvestmentCalculatorForm.valid) {
        const InitialInvestment = this.InvestmentCalculatorForm.value.InitialInvestment;
        const FinalValue = this.InvestmentCalculatorForm.value.FinalValue;
        const Time = this.InvestmentCalculatorForm.value.Time;
  
        if (InitialInvestment <= 0 || FinalValue<= 0  || Time<=0) {
          this.errorMessage = " All values must be greater than zero.";
          return; 
        }
  
        const x = 1/Time;
        
        this.Projectedcalculation = (((FinalValue-InitialInvestment)/InitialInvestment)*100);
        this.annualizedROI = ((Math.pow((FinalValue/InitialInvestment),(x)))-1)
        this.errorMessage = '';
      } else {
        this.errorMessage = "Please fill out all required fields.";
      }
    }
    
  
    resetForm() {
      this.InvestmentCalculatorForm.reset();
      this.Projectedcalculation = 0;
      this.annualizedROI = 0;
      this.errorMessage = '';
    }
}