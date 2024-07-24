import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    templateUrl: './Emergency-Fund.component.html',
    styleUrls: ['./Emergency-Fund.component.css']
})
export class EmergencyFundComponent {
    EmergencyFundCalculatorForm: FormGroup;

    TotalAmount: number = 0;
    GapToGoal: number = 0;
    errorMessage: string = '';

    constructor(private fb: FormBuilder) {
        this.EmergencyFundCalculatorForm = this.fb.group({
            MonthlyExpenses: [null, Validators.required],
            CoveragePeriod: [null, Validators.required],
            CurrentSavings: [null,],
        });
    }

    calculate() {
        if (this.EmergencyFundCalculatorForm.valid) {
            const MonthlyExpenses = this.EmergencyFundCalculatorForm.value.MonthlyExpenses;
            const CoveragePeriod = this.EmergencyFundCalculatorForm.value.CoveragePeriod;
            const CurrentSavings = this.EmergencyFundCalculatorForm.value.CurrentSavings || 0;

            if (MonthlyExpenses <= 0 || CoveragePeriod <= 0 || CurrentSavings < 0) {
                this.errorMessage = "All values must be greater than zero, and savings cannot be negative.";
                return;
            }

            this.TotalAmount = MonthlyExpenses * CoveragePeriod;
            this.GapToGoal = this.TotalAmount - CurrentSavings;

            this.errorMessage = '';
        } else {
            this.errorMessage = "Please fill out all required fields.";
        }
    }

    resetForm() {
        this.EmergencyFundCalculatorForm.reset();
        this.TotalAmount = 0;
        this.GapToGoal = 0;
        this.errorMessage = '';
    }
}