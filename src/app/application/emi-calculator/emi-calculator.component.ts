import { Component } from '@angular/core';

@Component({
    selector: 'app-emi-calculator',
    templateUrl: './emi-calculator.component.html',
    styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {
    principal: number = 0;
    interestRate: number = 0;
    time: number = 0;
    totalAmount: number = 0;
    monthlyEMI: number = 0;
    totalInterestPaid: number = 0;

    calculateEMI() {
        const principal = this.principal;
        const interestRate = this.interestRate / 12 / 100;
        const time = this.time * 12;

        const emi = (principal * interestRate * Math.pow(1 + interestRate, time)) / (Math.pow(1 + interestRate, time) - 1);
        this.totalAmount = emi * time;
        this.monthlyEMI = emi;
        this.totalInterestPaid = this.totalAmount - principal;
    }

    resetForm() {
        this.principal = 0;
        this.interestRate = 0;
        this.time = 0;
        this.totalAmount = 0;
        this.monthlyEMI = 0;
        this.totalInterestPaid = 0;
    }
}
