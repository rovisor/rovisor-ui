import { Component } from '@angular/core';

@Component({
    selector: 'app-saving-calculator',
    templateUrl: './saving-calculator.component.html',
    styleUrls: ['./saving-calculator.component.css']
})
export class SavingCalculatorComponent {
    principal: number | null = null;
    monthlyContribution: number | null = null;
    interestRate: number | null = null;
    compoundingFrequency: number | null = null;
    savingsPeriod: number | null = null;

    futureValue: number | null = null;
    totalContributions: number | null = null;
    totalInterest: number | null = null;
    errorMessage: string | null = null;

    calculateSavings() {
        if (this.principal == null || this.monthlyContribution ==null || this.interestRate ==null || this.compoundingFrequency ==null || this.savingsPeriod ==null) {
            this.errorMessage = 'All fields are required.';
            return;
        }

        const P = this.principal;
        const PMT = this.monthlyContribution;
        const r = this.interestRate;
        const n = this.compoundingFrequency;
        const t = this.savingsPeriod;

        const FV = P * Math.pow((1 + r / n), n * t) + PMT * (Math.pow((1 + r / n), n * t) - 1) / (r / n);
        if (this.principal <= 0 || this.monthlyContribution <= 0 || this.interestRate <= 0 || this.compoundingFrequency <= 0 || this.savingsPeriod <= 0) {
            this.errorMessage = 'Every value must be greater than zero.';
            return;
        }
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
