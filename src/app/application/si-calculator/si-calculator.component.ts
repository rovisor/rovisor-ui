import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    templateUrl: './si-calculator.component.html',
    styleUrls: ['./si-calculator.component.css']
})
export class SimpleInterestCalculatorComponent {
    payoffCalculatorForm: FormGroup;
    simpleInterest: number = 0;
    totalAmount: number = 0;
    errorMessage: string = '';

    constructor(private fb: FormBuilder) {
        this.payoffCalculatorForm = this.fb.group({
            Principal: [null, [Validators.required, Validators.min(0.01)]],
            AnnualInterestRate: [null, [Validators.required, Validators.min(0.01), Validators.max(100)]],
            time: [null, [Validators.required, Validators.min(0.01)]]
        });
    }

    calculate() {
        if (this.payoffCalculatorForm.valid) {
            const Principal = this.payoffCalculatorForm.value.Principal;
            const annualInterestRate = this.payoffCalculatorForm.value.AnnualInterestRate;
            const time = this.payoffCalculatorForm.value.time;

            if (Principal <= 0 || annualInterestRate <= 0 || time <= 0) {
                this.errorMessage = "All values must be greater than zero.";
                return;
            }

            this.simpleInterest = (Principal * annualInterestRate * time) / 100;
            this.totalAmount = Principal + this.simpleInterest;
            this.errorMessage = '';
        } else {
            this.errorMessage = "Please fill out all required fields.";
        }
    }

    resetForm() {
        this.payoffCalculatorForm.reset();
        this.simpleInterest = 0;
        this.totalAmount = 0;
        this.errorMessage = '';
    }
}
