import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-emergency-fund',
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
            MonthlyExpenses: [null, [Validators.required, Validators.min(0.01)]],
            CoveragePeriod: [null, [Validators.required, Validators.min(1)]],
            CurrentSavings: [null, [Validators.required, Validators.min(0)]],
        });

        this.EmergencyFundCalculatorForm.valueChanges.subscribe(() => this.resetResults());
    }

    calculate() {
        if (this.EmergencyFundCalculatorForm.valid) {
            const MonthlyExpenses = this.EmergencyFundCalculatorForm.value.MonthlyExpenses;
            const CoveragePeriod = this.EmergencyFundCalculatorForm.value.CoveragePeriod;
            const CurrentSavings = this.EmergencyFundCalculatorForm.value.CurrentSavings;

            if (MonthlyExpenses <= 0 || CoveragePeriod <= 0 || CurrentSavings < 0) {
                this.errorMessage = "All values must be greater than zero.";
                return;
            }

            this.TotalAmount = MonthlyExpenses * CoveragePeriod;
            this.GapToGoal = this.TotalAmount - CurrentSavings;
            this.errorMessage = '';
        } else {
            this.errorMessage = "Please fill out all required fields.";
        }
    }

    resetResults() {
        if (this.EmergencyFundCalculatorForm.dirty) {
            this.TotalAmount = 0;
            this.GapToGoal = 0;
        }
    }

    resetForm() {
        this.EmergencyFundCalculatorForm.reset();
        this.TotalAmount = 0;
        this.GapToGoal = 0;
        this.errorMessage = '';
    }
}
