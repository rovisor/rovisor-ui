import { Component } from '@angular/core';

@Component({
    selector: 'app-emi-calculator',
    templateUrl: './emi-calculator.component.html',
    styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {
    principal: number | null = null;
    interestRate: number | null = null;
    time: number | null = null;
    monthlyEMI: number = 0;
    totalAmount: number = 0;
    totalInterestPaid: number = 0;
    errorMessage: string = '';

    constructor() { }

    calculateEMI() {
        if (this.principal === null || this.interestRate === null || this.time === null) {
            this.errorMessage = 'All fields are required.';
            return;
        }

        const principal = this.principal;
        const annualInterestRate = this.interestRate;
        const timeInYears = this.time;
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfMonths = timeInYears * 12;

        this.errorMessage = '';

        const monthlyPayment = this.calculatePMT(principal, monthlyInterestRate, numberOfMonths);
        this.monthlyEMI = monthlyPayment;
        this.totalAmount = monthlyPayment * numberOfMonths;
        this.totalInterestPaid = this.totalAmount - principal;
    }

    calculatePMT(principal: number, monthlyInterestRate: number, numberOfMonths: number): number {
        const rate = monthlyInterestRate;
        const presentValue = principal;
        const numPeriods = numberOfMonths;
        const numerator = rate * Math.pow(1 + rate, numPeriods);
        const denominator = Math.pow(1 + rate, numPeriods) - 1;
        const pmt = presentValue * (numerator / denominator);

        return pmt;
    }

    resetForm() {
        this.principal = null;
        this.interestRate = null;
        this.time = null;
        this.monthlyEMI = 0;
        this.totalAmount = 0;
        this.totalInterestPaid = 0;
        this.errorMessage = '';
    }
}
