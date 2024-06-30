import { Component } from '@angular/core';

@Component({
    selector: 'app-saving-calculator',
    templateUrl: './saving-calculator.component.html',
    styleUrls: ['./saving-calculator.component.css']
})
export class SavingCalculatorComponent {
    principal: number = 0;
    monthlyContribution: number = 0;
    interestRate: number = 0;
    compoundingFrequency: number = 12; // Default to monthly
    savingsPeriod: number = 0;

    futureValue: number | null = null;
    totalContributions: number | null = null;
    totalInterest: number | null = null;
    errorMessage: string | null = null;

    calculateSavings() {
        if (this.principal < 0 || this.monthlyContribution < 0 || this.interestRate < 0 || this.compoundingFrequency <= 0 || this.savingsPeriod < 0) {
            this.errorMessage = 'Please enter non-negative values for all fields.';
            return;
        }

        const P = this.principal;
        const PMT = this.monthlyContribution;
        const r = this.interestRate;
        const n = this.compoundingFrequency;
        const t = this.savingsPeriod;

        const FV = P * Math.pow((1 + r / n), n * t) + PMT * (Math.pow((1 + r / n), n * t) - 1) / (r / n);

        this.futureValue = FV;
        this.totalContributions = P + PMT * t * 12;
        this.totalInterest = FV - this.totalContributions;
        this.errorMessage = null;
    }

    resetForm() {
        this.principal = 0;
        this.monthlyContribution = 0;
        this.interestRate = 0;
        this.compoundingFrequency = 12;
        this.savingsPeriod = 0;

        this.futureValue = null;
        this.totalContributions = null;
        this.totalInterest = null;
        this.errorMessage = null;
    }
}
