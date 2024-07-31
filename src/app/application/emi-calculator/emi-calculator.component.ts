import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-emi-calculator',
    templateUrl: './emi-calculator.component.html',
    styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent {
    emiCalculatorForm: FormGroup;

    principal: number = 0;
    interestRate: number = 0;
    time: number = 0;
    monthlyEMI: number = 0;
    totalAmount: number = 0;
    totalInterestPaid: number = 0;
    errorMessage: string = '';

    constructor(private fb: FormBuilder) {
        this.emiCalculatorForm = this.fb.group({
            principal: [null, [Validators.required, Validators.min(0.01)]],
            interestRate: [null, [Validators.required, Validators.min(0.01)]],
            time: [null, [Validators.required, Validators.min(0.01)]]
        });

        this.emiCalculatorForm.valueChanges.subscribe(() => {
            this.resetCalculations();
        });
    }

    calculateEMI() {
        if (this.emiCalculatorForm.valid) {
            const principal = this.emiCalculatorForm.value.principal;
            const interestRate = this.emiCalculatorForm.value.interestRate;
            const time = this.emiCalculatorForm.value.time;

            // Additional check to ensure values are not zero
            if (principal <= 0 || interestRate <= 0 || time <= 0) {
                this.errorMessage = 'All values must be greater than zero.';
                this.resetCalculations();
                return;
            }

            const monthlyInterestRate = interestRate / 1200;
            const numberOfMonths = time * 12;

            const monthlyPayment = this.calculatePMT(principal, monthlyInterestRate, numberOfMonths);
            this.monthlyEMI = monthlyPayment;
            this.totalAmount = monthlyPayment * numberOfMonths;
            this.totalInterestPaid = this.totalAmount - principal;

            this.errorMessage = '';
        } else {
            this.errorMessage = 'Please fill out all required fields.';
        }
    }

    calculatePMT(principal: number, monthlyInterestRate: number, numberOfMonths: number): number {
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
        return principal * (numerator / denominator);
    }

    resetForm() {
        this.emiCalculatorForm.reset();
        this.resetCalculations();
    }

    resetCalculations() {
        this.monthlyEMI = 0;
        this.totalAmount = 0;
        this.totalInterestPaid = 0;
        this.errorMessage = '';
    }
}
