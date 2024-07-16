import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-emi-calculator',
    templateUrl: './emi-calculator.component.html',
    styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {
    emiCalculatorForm: FormGroup;

    principal: number | null = null;
    interestRate: number | null = null;
    time: number | null = null;
    monthlyEMI: number = 0;
    totalAmount: number = 0;
    totalInterestPaid: number = 0;
    errorMessage: string = '';

    constructor(private fb: FormBuilder) {
        this.emiCalculatorForm = this.fb.group({
            principal: [null, Validators.required],
            interestRate: [null, Validators.required],
            time: [null, Validators.required],
        });
    }

    calculateEMI() {
        if (this.emiCalculatorForm.valid) {
            const principal = this.emiCalculatorForm.value.principal;
            const interestRate = this.emiCalculatorForm.value.interestRate;
            const time = this.emiCalculatorForm.value.time;

            if (principal <= 0 || interestRate <= 0 || time <= 0) {
                this.errorMessage = 'All values must be greater than zero.';
                this.totalAmount = 0;
                this.monthlyEMI = 0;
                this.totalInterestPaid = 0;
                return;
            }

            const monthlyInterestRate = interestRate / 12 ;
            const numberOfMonths = time * 12;

            this.errorMessage = '';
            const monthlyPayment = this.calculatePMT(principal, monthlyInterestRate, numberOfMonths);
            this.monthlyEMI = monthlyPayment;
            this.totalAmount = monthlyPayment * numberOfMonths;
            this.totalInterestPaid = this.totalAmount - principal;
        } else {
            this.errorMessage = 'Please fill out all required fields.';
        }
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
        this.emiCalculatorForm.reset();
        this.principal = null;
        this.interestRate = null;
        this.time = null;
        this.monthlyEMI = 0;
        this.totalAmount = 0;
        this.totalInterestPaid = 0;
        this.errorMessage = '';
    }
}
