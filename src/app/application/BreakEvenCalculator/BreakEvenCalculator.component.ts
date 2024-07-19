import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './BreakEvenCalculator.component.html',
  styleUrls: ['./BreakEvenCalculator.component.css']
})
export class BreakEvenCalculatorComponent {
    BreakEvenForm: FormGroup;
    BreakEvenPoint: number = 0;
    BreakEvenRevenue: number = 0;
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder) {
      this.BreakEvenForm = this.fb.group({
        FixedCosts: [null, Validators.required],
        VariableCosts: [null, [Validators.required, Validators.min(0)]],
        SalesPrice: [null, Validators.required],
        
      });
    }
  
    calculateEMI() {
      if (this.BreakEvenForm.valid) {
        const FixedCosts = this.BreakEvenForm.value.FixedCosts;
        const VariableCosts = this.BreakEvenForm.value.VariableCosts;
        const SalesPrice = this.BreakEvenForm.value.SalesPrice;
        
  
        if (FixedCosts <= 0 || VariableCosts <= 0 || SalesPrice <= 0 ) {
          this.errorMessage = " All values must be greater than zero.";
          return; 
        }
        if (VariableCosts > SalesPrice) {
            this.errorMessage = " Variable Cost must be less than Sale Price .";
            return;
          }
  
        const Margin = (SalesPrice-VariableCosts) ;
  
        this.BreakEvenPoint = (FixedCosts / Margin);
        this.BreakEvenRevenue = (this.BreakEvenPoint * SalesPrice);
       
  
        this.errorMessage = '';
      } else {
        this.errorMessage = "Please fill out all required fields.";
      }
    }
    
  
    resetForm() {
      this.BreakEvenForm.reset();
      this.BreakEvenPoint = 0;
      this.BreakEvenRevenue = 0;
      this.errorMessage = '';
    }
}
