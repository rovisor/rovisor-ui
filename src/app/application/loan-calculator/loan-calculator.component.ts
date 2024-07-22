import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-loan-calculator',
    templateUrl: './loan-calculator.component.html',
    styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {
    loanCalculatorForm!: FormGroup;
    monthlyPayment: number | null = null;
    totalMonthlyPayment: number | null = null;
    errorMessage: string | null = null;

    amortizationSchedule: {
        paymentNumber: number;
        beginningBalance: number;
        scheduledPayment: number;
        additionalPayment: number;
        totalPayment: number;
        interestPayment: number;
        principalPayment: number;
        endingBalance: number;
    }[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.loanCalculatorForm = this.fb.group({
            principal: ['', [Validators.required, Validators.min(1)]],
            interestRate: ['', [Validators.required, Validators.min(0.01)]],
            loanTerm: ['', [Validators.required, Validators.min(1)]],
            additionalMonthlyPayment: ['', [Validators.required, Validators.min(0)]]
        });
    }

    calculateMonthlyPayment(): void {
        if (this.loanCalculatorForm.invalid) {
            this.errorMessage = 'All fields are required to fill.';
            return;
        }

        const P = this.loanCalculatorForm.value.principal;
        const annualRate = this.loanCalculatorForm.value.interestRate / 100;
        const r = annualRate / 12;
        const n = this.loanCalculatorForm.value.loanTerm * 12;
        const additionalMonthlyPayment = this.loanCalculatorForm.value.additionalMonthlyPayment;

        const M = P * r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1);
        this.monthlyPayment = M;
        this.totalMonthlyPayment = M + additionalMonthlyPayment;
        this.errorMessage = null;

        this.generateAmortizationSchedule(P, r, n, additionalMonthlyPayment);
    }

    generateAmortizationSchedule(P: number, r: number, n: number, additionalMonthlyPayment: number): void {
        this.amortizationSchedule = [];
        let remainingBalance = P;

        for (let month = 1; month <= n; month++) {
            const interest = remainingBalance * r;
            const principal = this.monthlyPayment! - interest;
            const totalPayment = this.monthlyPayment! + additionalMonthlyPayment;
            remainingBalance -= principal + additionalMonthlyPayment;

            // Ensure no negative values
            const adjustedRemainingBalance = Math.max(0, remainingBalance);

            this.amortizationSchedule.push({
                paymentNumber: month,
                beginningBalance: Math.max(0, remainingBalance + principal + additionalMonthlyPayment),
                scheduledPayment: this.monthlyPayment!,
                additionalPayment: additionalMonthlyPayment,
                totalPayment: totalPayment,
                interestPayment: Math.max(0, interest),
                principalPayment: Math.max(0, principal + additionalMonthlyPayment),
                endingBalance: adjustedRemainingBalance
            });

            // Ensure remaining balance is reset to zero if negative
            if (remainingBalance < 0) remainingBalance = 0;
            if (adjustedRemainingBalance === 0) break;
        }
    }

    resetForm(): void {
        this.loanCalculatorForm.reset();
        this.monthlyPayment = null;
        this.totalMonthlyPayment = null;
        this.errorMessage = null;
        this.amortizationSchedule = [];
    }
}
