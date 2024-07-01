import { Component } from '@angular/core';

@Component({
    selector: 'app-loan-calculator',
    templateUrl: './loan-calculator.component.html',
    styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent {
    principal: number| null=null;
    interestRate: number | null = null;
    loanTerm: number | null = null;
    additionalMonthlyPayment: number | null = null;

    monthlyPayment: number | null = null;
    totalMonthlyPayment: number | null = null;
    errorMessage: string | null = null;

    calculateMonthlyPayment() {
        if (this.principal == null || this.loanTerm == null || this.interestRate == null || this.additionalMonthlyPayment == null ) {
            this.errorMessage = 'All fields are required to fill.';
            return;
        }
       

        const P = this.principal;
        const annualRate = this.interestRate / 100;
        const r = annualRate / 12;
        const n = this.loanTerm * 12;

        const M = P * r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1);

        if (this.principal <= 0 || this.interestRate <= 0 || this.loanTerm <= 0 || this.additionalMonthlyPayment <= 0) {
            this.errorMessage = 'Please enter non-negative values for all fields.';
            return;
            
        }
        this.monthlyPayment = M;
        this.totalMonthlyPayment = M + this.additionalMonthlyPayment;
        this.errorMessage = null;
    }

    resetForm() {
        this.principal = 0;
        this.interestRate = 0;
        this.loanTerm = 0;
        this.additionalMonthlyPayment = 0;

        this.monthlyPayment = null;
        this.totalMonthlyPayment = null;
        this.errorMessage = null;
    }
}
