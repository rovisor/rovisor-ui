import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-compoundIntreset',
  templateUrl: './compoundIntreset.component.html',
  styleUrls: ['./compoundIntreset.component.css']
})
export class compoundIntresetComponent {
  intrestForm: FormGroup;

  ProjectedRetirementSavings: number = 0;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.intrestForm = this.fb.group({
      principalAmount: [null, Validators.required],
      annualIntrest: [null, [Validators.required,]],
      compoundFrequency: [null, Validators.required],
      investmentPeriod: [null, Validators.required],
    });
  }

  calculateEMI() {
    if (this.intrestForm.valid) {
      const principalAmount = this.intrestForm.value.principalAmount;
      const annualIntrest = this.intrestForm.value.annualIntrest;
      const compoundFrequency = this.intrestForm.value.compoundFrequency;
      const investmentPeriod = this.intrestForm.value.investmentPeriod;

      if (principalAmount <= 0 || annualIntrest <= 0 || compoundFrequency <= 0 || investmentPeriod <= 0  ) {
        this.errorMessage = " All values must be greater than zero.";
        return; 
      }



      this.ProjectedRetirementSavings = (principalAmount*(Math.pow(1 +(annualIntrest/compoundFrequency),(compoundFrequency*investmentPeriod))));
      this.errorMessage = '';
    } else {
      this.errorMessage = "Please fill out all required fields.";
    }
  }
  

  resetForm() {
    this.intrestForm.reset();
    this.ProjectedRetirementSavings = 0;
    this.errorMessage = '';
  }
}