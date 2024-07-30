import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-home-affordability-calculator',
    templateUrl: './homeaffordability-calculator.component.html',
    styleUrls: ['./homeaffordability-calculator.component.css']
})
export class HomeAffordabilityComponent {
    homeAffordabilityForm: FormGroup;
    monthlyGrossIncome: number = 0;
    maxMonthlyPayment: number = 0;
    monthlyInterestRate: number = 0;
    numberOfPayments: number = 0;
    loanAmount: number = 0;
    maxHomePrice: number = 0;
    errorMessage: string = '';
    debtToIncomeRatio: number = 0.36;

    constructor(private fb: FormBuilder) {
        this.homeAffordabilityForm = this.fb.group({
            annualIncome: [null, [Validators.required, this.positiveNumberValidator]],
            downPayment: [null, [Validators.required, this.positiveNumberValidator]],
            loanTerm: [null, [Validators.required, this.positiveNumberValidator]],
            annualInterestRate: [null, [Validators.required, this.positiveNumberValidator]]
        });

        this.homeAffordabilityForm.valueChanges.subscribe(() => {
            if (this.homeAffordabilityForm.invalid) {
                this.resetCalculatedValues();
            }
        });
    }

    positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
        return control.value <= 0 ? { positiveNumber: true } : null;
    }

    calculate() {
        if (this.homeAffordabilityForm.valid) {
            const annualIncome = this.homeAffordabilityForm.value.annualIncome;
            const downPayment = this.homeAffordabilityForm.value.downPayment;
            const loanTerm = this.homeAffordabilityForm.value.loanTerm;
            const annualInterestRate = this.homeAffordabilityForm.value.annualInterestRate;

           
            this.monthlyGrossIncome = annualIncome / 12;
            this.maxMonthlyPayment = this.monthlyGrossIncome * this.debtToIncomeRatio;
            this.monthlyInterestRate = annualInterestRate / (12 * 100);
            this.numberOfPayments = loanTerm * 12;

            
            const r = this.monthlyInterestRate;
            const n = this.numberOfPayments;
            const M = this.maxMonthlyPayment;

            this.loanAmount = (M * (Math.pow((1 + r), n) - 1)) / (r * Math.pow((1 + r), n));
            this.maxHomePrice = this.loanAmount + downPayment;

            this.errorMessage = '';
        } else {
            this.resetCalculatedValues();
            this.errorMessage = "Please fill out all required fields with valid values.";
        }
    }

    resetForm() {
        this.homeAffordabilityForm.reset();
        this.resetCalculatedValues();
        this.errorMessage = '';
    }

    resetCalculatedValues() {
        this.monthlyGrossIncome = 0;
        this.maxMonthlyPayment = 0;
        this.monthlyInterestRate = 0;
        this.numberOfPayments = 0;
        this.loanAmount = 0;
        this.maxHomePrice = 0;
    }
}
