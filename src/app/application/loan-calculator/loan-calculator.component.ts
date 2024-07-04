import { Component } from '@angular/core';

@Component({
    selector: 'app-loan-calculator',
    templateUrl: './loan-calculator.component.html',
    styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent {
    principal: number | null = null;
    interestRate: number | null = null;
    loanTerm: number | null = null;
    additionalMonthlyPayment: number | null = null;

    monthlyPayment: number | null = null;
    totalMonthlyPayment: number | null = null;
    errorMessage: string | null = null;

    amortizationSchedule: { paymentNumber: number; beginningBalance: number; scheduledPayment: number; additionalPayment: number; totalPayment: number; interestPayment: number; principalPayment: number; endingBalance: number; }[] = [];

    calculateMonthlyPayment() {
        if (this.principal == null || this.loanTerm == null || this.interestRate == null || this.additionalMonthlyPayment == null) {
            this.errorMessage = 'All fields are required to fill.';
            return;
        }

        if (this.principal <= 0 || this.interestRate <= 0 || this.loanTerm <= 0 || this.additionalMonthlyPayment <= 0) {
            this.errorMessage = 'Please enter non-negative values for all fields.';
            return;
        }

        const P = this.principal;
        const annualRate = this.interestRate / 100;
        const r = annualRate / 12;
        const n = this.loanTerm * 12;

        const M = P * r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1);
        this.monthlyPayment = M;
        this.totalMonthlyPayment = M + this.additionalMonthlyPayment;
        this.errorMessage = null;

        this.generateAmortizationSchedule(P, r, n);
    }

    generateAmortizationSchedule(P: number, r: number, n: number) {
        this.amortizationSchedule = [];
        let remainingBalance = P;

        for (let month = 1; month <= n; month++) {
            const interest = remainingBalance * r;
            const principal = this.monthlyPayment! - interest;
            const additionalPayment = this.additionalMonthlyPayment!;
            const totalPayment = this.monthlyPayment! + additionalPayment;
            remainingBalance -= principal + additionalPayment;

            this.amortizationSchedule.push({
                paymentNumber: month,
                beginningBalance: remainingBalance + principal + additionalPayment,
                scheduledPayment: this.monthlyPayment!,
                additionalPayment: additionalPayment,
                totalPayment: totalPayment,
                interestPayment: interest,
                principalPayment: principal + additionalPayment,
                endingBalance: remainingBalance
            });
        }
    }

    resetForm() {
        this.principal = 0;
        this.interestRate = 0;
        this.loanTerm = 0;
        this.additionalMonthlyPayment = 0;

        this.monthlyPayment = null;
        this.totalMonthlyPayment = null;
        this.errorMessage = null;
        this.amortizationSchedule = [];
    }
}
