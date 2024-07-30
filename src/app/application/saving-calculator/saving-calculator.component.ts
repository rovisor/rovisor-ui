import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-saving-calculator',
    templateUrl: './saving-calculator.component.html',
    styleUrls: ['./saving-calculator.component.css']
})
export class SavingCalculatorComponent {
    savingsCalculatorForm: FormGroup;

    futureValue: number = 0;
    totalContributions: number = 0;
    totalInterest: number = 0;
    errorMessage: string = '';

    constructor(private fb: FormBuilder) {
        this.savingsCalculatorForm = this.fb.group({
            principal: [null, [Validators.required, Validators.min(0.01)]],
            monthlyContribution: [null, [Validators.required, Validators.min(0.01)]],
            interestRate: [null, [Validators.required, Validators.min(0.01)]],
            compoundingFrequency: [null, [Validators.required, Validators.min(0.01)]],
            savingsPeriod: [null, [Validators.required, Validators.min(0.01)]]
        });

        
        this.savingsCalculatorForm.valueChanges.subscribe(() => {
            this.resetCalculations();
        });
    }

    calculateSavings() {
        if (this.savingsCalculatorForm.valid) {
            const principal = this.savingsCalculatorForm.value.principal;
            const monthlyContribution = this.savingsCalculatorForm.value.monthlyContribution;
            const interestRate = this.savingsCalculatorForm.value.interestRate;
            const compoundingFrequency = this.savingsCalculatorForm.value.compoundingFrequency;
            const savingsPeriod = this.savingsCalculatorForm.value.savingsPeriod;

            if (principal <= 0 || monthlyContribution <= 0 || interestRate <= 0 || compoundingFrequency <= 0 || savingsPeriod <= 0) {
                this.errorMessage = 'Every value must be greater than zero.';
                return;
            }

            const r = interestRate / 100;
            const n = compoundingFrequency;
            const t = savingsPeriod;

            const FV = principal * Math.pow((1 + r / n), n * t) + monthlyContribution * (Math.pow((1 + r / n), n * t) - 1) / (r / n);

            this.futureValue = FV;
            this.totalContributions = principal + monthlyContribution * t * 12;
            this.totalInterest = FV - this.totalContributions;

            this.errorMessage = '';
        } else {
            this.errorMessage = 'Please fill out all required fields.';
        }
    }

    resetForm() {
        this.savingsCalculatorForm.reset();
        this.resetCalculations();
    }

    resetCalculations() {
        this.futureValue = 0;
        this.totalContributions = 0;
        this.totalInterest = 0;
        this.errorMessage = '';
    }
}
