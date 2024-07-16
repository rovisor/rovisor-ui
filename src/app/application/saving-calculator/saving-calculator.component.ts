import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-saving-calculator',
    templateUrl: './saving-calculator.component.html',
    styleUrls: ['./saving-calculator.component.css']
})
export class SavingCalculatorComponent {
    savingsCalculatorForm: FormGroup;

    futureValue: number | null = null;
    totalContributions: number | null = null;
    totalInterest: number | null = null;
    errorMessage: string | null = null;

    constructor(private fb: FormBuilder) {
        this.savingsCalculatorForm = this.fb.group({
            principal: [null, Validators.required],
            monthlyContribution: [null, Validators.required],
            interestRate: [null, Validators.required],
            compoundingFrequency: [null, Validators.required],
            savingsPeriod: [null, Validators.required],
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

            const r = interestRate;
            const n = compoundingFrequency;
            const t = savingsPeriod;

            const FV = principal * Math.pow((1 + r / n), n * t) + monthlyContribution * (Math.pow((1 + r / n), n * t) - 1) / (r / n);

            this.futureValue = FV;
            this.totalContributions = principal + monthlyContribution * t * 12;

            if (this.totalContributions !== null) {
                this.totalInterest = FV - this.totalContributions;
            } else {
                this.totalInterest = 0;
            }

            this.errorMessage = null;
        } else {
            this.errorMessage = 'Please fill out all required fields.';
        }
    }

    resetForm() {
        this.savingsCalculatorForm.reset();
        this.futureValue = null;
        this.totalContributions = null;
        this.totalInterest = null;
        this.errorMessage = null;
    }
}
