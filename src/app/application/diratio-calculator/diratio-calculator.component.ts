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
        if (this.debitincomeCalculatorForm.valid) {
            const mortgagePayments = this.debitincomeCalculatorForm.value.mortgagePayments;
            const carLoanPayments = this.debitincomeCalculatorForm.value.carLoanPayments;
            const studentLoanPayments = this.debitincomeCalculatorForm.value.studentLoanPayments;
            const creditCardPayments = this.debitincomeCalculatorForm.value.creditCardPayments;
            const personalLoanPayments = this.debitincomeCalculatorForm.value.personalLoanPayments;
            const otherDebtPayments = this.debitincomeCalculatorForm.value.otherDebtPayments;

            const salaryWages = this.debitincomeCalculatorForm.value.salaryWages;
            const bonusesCommissions = this.debitincomeCalculatorForm.value.bonusesCommissions;
            const rentalIncome = this.debitincomeCalculatorForm.value.rentalIncome;
            const investmentIncome = this.debitincomeCalculatorForm.value.investmentIncome;
            const otherIncomeSources = this.debitincomeCalculatorForm.value.otherIncomeSources;

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
    }
}