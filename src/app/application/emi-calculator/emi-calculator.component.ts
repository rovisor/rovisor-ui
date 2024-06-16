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
    totalAmount: number = 0;
    monthlyEMI: number = 0;
    totalInterestPaid: number = 0;
    errorMessage: string = '';

    calculateEMI() {
        if (this.principal === null || this.interestRate === null || this.time === null) {
            this.errorMessage = 'All fields are required.';
            this.totalAmount = 0;
            this.monthlyEMI = 0;
            this.totalInterestPaid = 0;
            return;
        }

        const principal = this.principal;
        const interestRate = this.interestRate / 12 / 100;
        const time = this.time * 12;

        if (principal <= 0 || time <= 0 || interestRate <= 0) {
            this.errorMessage = 'Every value must be greater than zero.';
            this.totalAmount = 0;
            this.monthlyEMI = 0;
            this.totalInterestPaid = 0;
            return;
        }

        this.errorMessage = '';
        const emi = (principal * interestRate * Math.pow(1 + interestRate, time)) / (Math.pow(1 + interestRate, time) - 1);
        this.totalAmount = emi * time;
        this.monthlyEMI = emi;
        this.totalInterestPaid = this.totalAmount - principal;

    }

    resetForm() {
        this.principal = null;
        this.interestRate = null;
        this.time = null;
        this.totalAmount = 0;
        this.monthlyEMI = 0;
        this.totalInterestPaid = 0;
        this.errorMessage = '';
    }
}
