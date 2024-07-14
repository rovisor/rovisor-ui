import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-calculator',
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
            annualIncome: [null, Validators.required],
            downPayment: [null, Validators.required],
            loanTerm: [null, Validators.required],
            annualInterestRate: [null, Validators.required]
        });
    }

    calculate() {
        if (this.homeAffordabilityForm.valid) {
            const annualIncome = this.homeAffordabilityForm.value.annualIncome;
            const downPayment = this.homeAffordabilityForm.value.downPayment;
            const loanTerm = this.homeAffordabilityForm.value.loanTerm;
            const annualInterestRate = this.homeAffordabilityForm.value.annualInterestRate;

            if (annualIncome <= 0 || downPayment < 0 || loanTerm <= 0 || annualInterestRate <= 0) {
                this.errorMessage = "All values must be greater than zero.";
                return;
            }

            // Calculations
            this.monthlyGrossIncome = annualIncome / 12;
            this.maxMonthlyPayment = this.monthlyGrossIncome * this.debtToIncomeRatio;
            this.monthlyInterestRate = annualInterestRate / (12 * 100);
            this.numberOfPayments = loanTerm * 12;

            // Loan Amount Calculation
            const r = this.monthlyInterestRate;
            const n = this.numberOfPayments;
            const M = this.maxMonthlyPayment;

            this.loanAmount = (M * (Math.pow((1 + r), n) - 1)) / (r * Math.pow((1 + r), n));
            this.maxHomePrice = this.loanAmount + downPayment;

            this.errorMessage = '';
        } else {
            this.errorMessage = "Please fill out all required fields.";
        }
    }

    resetForm() {
        this.homeAffordabilityForm.reset();
        this.monthlyGrossIncome = 0;
        this.maxMonthlyPayment = 0;
        this.monthlyInterestRate = 0;
        this.numberOfPayments = 0;
        this.loanAmount = 0;
        this.maxHomePrice = 0;
        this.errorMessage = '';
    }
}
