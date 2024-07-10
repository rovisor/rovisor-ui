import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    templateUrl: './diratio-calculator.component.html',
    styleUrls: ['./diratio-calculator.component.css']
})
export class DebttoIncomeRatioCalculatorComponentComponent {
    debitincomeCalculatorForm: FormGroup;

    dtiRatio: number = 0;
    errorMessage: string = '';
    hasNegativeValue: boolean = false;

    constructor(private fb: FormBuilder) {
        this.debitincomeCalculatorForm = this.fb.group({
            mortgagePayments: [null, Validators.required],
            carLoanPayments: [null, Validators.required],
            studentLoanPayments: [null, Validators.required],
            creditCardPayments: [null, Validators.required],
            personalLoanPayments: [null, Validators.required],
            otherDebtPayments: [null, Validators.required],
            salaryWages: [null, Validators.required],
            bonusesCommissions: [null, Validators.required],
            rentalIncome: [null, Validators.required],
            investmentIncome: [null, Validators.required],
            otherIncomeSources: [null, Validators.required],
        });
    }

    calculate() {
        const formValues = this.debitincomeCalculatorForm.value;
        const hasNegativeValue = Object.keys(formValues).some(key => formValues[key] < 0);

        if (hasNegativeValue) {
            this.errorMessage = "Values cannot be negative.";
            return;
        }

        if (this.debitincomeCalculatorForm.valid) {
            const mortgagePayments = formValues.mortgagePayments;
            const carLoanPayments = formValues.carLoanPayments;
            const studentLoanPayments = formValues.studentLoanPayments;
            const creditCardPayments = formValues.creditCardPayments;
            const personalLoanPayments = formValues.personalLoanPayments;
            const otherDebtPayments = formValues.otherDebtPayments;

            const salaryWages = formValues.salaryWages;
            const bonusesCommissions = formValues.bonusesCommissions;
            const rentalIncome = formValues.rentalIncome;
            const investmentIncome = formValues.investmentIncome;
            const otherIncomeSources = formValues.otherIncomeSources;

            const totalDebtPayments = mortgagePayments + carLoanPayments + studentLoanPayments + creditCardPayments + personalLoanPayments + otherDebtPayments;
            const totalMonthlyIncome = salaryWages + bonusesCommissions + rentalIncome + investmentIncome + otherIncomeSources;

            if (totalDebtPayments <= 0 || totalMonthlyIncome <= 0) {
                this.errorMessage = "All values must be greater than zero.";
                return;
            }

            this.dtiRatio = (totalDebtPayments / totalMonthlyIncome);
            this.errorMessage = '';

        } else {
            this.errorMessage = "Please fill out all required fields.";
        }
    }

    resetForm() {
        this.debitincomeCalculatorForm.reset();
        this.dtiRatio = 0;
        this.errorMessage = '';
        this.hasNegativeValue = false; // Reset negative value check
    }

    checkForNegativeValues() {
        const formValues = this.debitincomeCalculatorForm.value;
        this.hasNegativeValue = Object.keys(formValues).some(key => formValues[key] < 0);
    }
}
