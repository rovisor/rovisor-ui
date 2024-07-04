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
    amortizationSchedule: any[] = [];

    calculateMonthlyPayment() {
        if (this.principal == null || this.loanTerm == null || this.interestRate == null || this.additionalMonthlyPayment == null) {
            this.errorMessage = 'All fields are required to fill.';
            return;
        }

        if (this.principal <= 0 || this.interestRate <= 0 || this.loanTerm <= 0 || this.additionalMonthlyPayment < 0) {
            this.errorMessage = 'Please enter positive values for principal, interest rate, and loan term.';
            return;
        }

        const P = this.principal;
        const annualRate = this.interestRate / 100;
        const r = annualRate / 12;
        const n = this.loanTerm * 12;

        this.errorMessage = null;

        this.calculateAmortizationSchedule(P, r, n, this.additionalMonthlyPayment);
    }

    calculateAmortizationSchedule(principal: number, monthlyRate: number, totalPayments: number, additionalPayment: number) {
        this.amortizationSchedule = [];
        let remainingBalance = principal;

        for (let i = 1; i <= totalPayments; i++) {
            const monthlyPayment = remainingBalance * (monthlyRate * Math.pow((1 + monthlyRate), (totalPayments - i + 1))) / (Math.pow((1 + monthlyRate), (totalPayments - i + 1)) - 1);
            const totalMonthlyPayment = monthlyPayment + additionalPayment;
            const interestPayment = remainingBalance * monthlyRate;
            const principalPayment = totalMonthlyPayment - interestPayment;
            const endingBalance = remainingBalance - principalPayment;

            this.amortizationSchedule.push({
                paymentNumber: i,
                beginningBalance: remainingBalance,
                scheduledPayment: monthlyPayment,
                additionalPayment: additionalPayment,
                totalPayment: totalMonthlyPayment,
                interestPayment: interestPayment,
                principalPayment: principalPayment,
                endingBalance: endingBalance
            });

            remainingBalance = endingBalance;

            if (remainingBalance <= 0) {
                break;
            }
        }
    }

    resetForm() {
        this.principal = null;
        this.interestRate = null;
        this.loanTerm = null;
        this.additionalMonthlyPayment = null;

        this.monthlyPayment = null;
        this.totalMonthlyPayment = null;
        this.errorMessage = null;
        this.amortizationSchedule = [];
    }
}
