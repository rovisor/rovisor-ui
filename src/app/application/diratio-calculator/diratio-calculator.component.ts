import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    templateUrl: './diratio-calculator.component.html',
    styleUrls: ['./diratio-calculator.component.css']
})
export class DebttoIncomeRatioCalculatorComponent {
    DebttoIncomeRatioCalculatorForm: FormGroup;
    dtiRatio: number = 0;
    errorMessage: string = '';
    hasNegativeValue: boolean = false;

    constructor(private fb: FormBuilder) {
        this.DebttoIncomeRatioCalculatorForm = this.fb.group({
            mortgagePayments: [null, [Validators.required, this.negativeValidator]],
            carLoanPayments: [null, [Validators.required, this.negativeValidator]],
            studentLoanPayments: [null, [Validators.required, this.negativeValidator]],
            creditCardPayments: [null, [Validators.required, this.negativeValidator]],
            personalLoanPayments: [null, [Validators.required, this.negativeValidator]],
            otherDebtPayments: [null, [Validators.required, this.negativeValidator]],
            salaryWages: [null, [Validators.required, this.negativeValidator]],
            bonusesCommissions: [null, [Validators.required, this.negativeValidator]],
            rentalIncome: [null, [Validators.required, this.negativeValidator]],
            investmentIncome: [null, [Validators.required, this.negativeValidator]],
            otherIncomeSources: [null, [Validators.required, this.negativeValidator]],
        });
    }

    calculate() {
        if (this.DebttoIncomeRatioCalculatorForm.valid && !this.hasNegativeValue) {
            const formValues = this.DebttoIncomeRatioCalculatorForm.value;

            const totalDebtPayments = formValues.mortgagePayments + formValues.carLoanPayments + formValues.studentLoanPayments +
                formValues.creditCardPayments + formValues.personalLoanPayments + formValues.otherDebtPayments;

            const totalMonthlyIncome = formValues.salaryWages + formValues.bonusesCommissions + formValues.rentalIncome +
                formValues.investmentIncome + formValues.otherIncomeSources;

            if (totalDebtPayments <= 0 || totalMonthlyIncome <= 0) {
                this.errorMessage = "All values must be greater than zero.";
                this.dtiRatio = 0; // Reset the output to 0
                return;
            }

            this.dtiRatio = (totalDebtPayments / totalMonthlyIncome);
            this.errorMessage = '';

        } else {
            this.errorMessage = "Please fill out all required fields.";
            this.dtiRatio = 0; 
        }
    }

    resetForm() {
        this.DebttoIncomeRatioCalculatorForm.reset();
        this.dtiRatio = 0;
        this.errorMessage = '';
        this.hasNegativeValue = false;
    }

    checkForNegativeValues() {
        const formValues = this.DebttoIncomeRatioCalculatorForm.value;
        this.hasNegativeValue = Object.keys(formValues).some(key => formValues[key] < 0);
        if (this.hasNegativeValue) {
            this.dtiRatio = 0; // Reset the output to 0 if any value is negative
        }
    }

    negativeValidator(control: AbstractControl): ValidationErrors | null {
        if (control.value < 0) {
            return { negativeValue: true };
        }
        return null;
    }
}
