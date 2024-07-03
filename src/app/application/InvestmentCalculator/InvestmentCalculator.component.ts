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
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder) {
      this.InvestmentCalculatorForm = this.fb.group({
        InitialInvestment: [null, Validators.required],
        FinalValue: [null, Validators.required],
      });
    }
  
    calculate() {
      if (this.InvestmentCalculatorForm.valid) {
        const InitialInvestment = this.InvestmentCalculatorForm.value.InitialInvestment;
        const FinalValue = this.InvestmentCalculatorForm.value.FinalValue;
  
        if (InitialInvestment <= 0 || FinalValue<= 0 ) {
          this.errorMessage = " All values must be greater than zero.";
          return; 
        }
  

        
        this.Projectedcalculation = (((FinalValue-InitialInvestment)/InitialInvestment)*100);
  
        this.errorMessage = '';
      } else {
        this.errorMessage = "Please fill out all required fields.";
      }
    }
    
  
    resetForm() {
      this.InvestmentCalculatorForm.reset();
      this.Projectedcalculation = 0;
      this.errorMessage = '';
    }
}