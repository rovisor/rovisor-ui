import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    templateUrl: './diratio-calculator.component.html',
    styleUrls: ['./diratio-calculator.component.css']
})
export class DebttoIncomeRatioCalculatorComponent implements OnInit {
    DebttoIncomeRatioCalculatorForm: FormGroup;
    dtiRatio: number = 0;
    errorMessage: string = '';
    hasNegativeValue: boolean = false;

    debtFields = [
        { name: 'mortgagePayments', label: 'Mortgage/Rent Payments:' },
        { name: 'carLoanPayments', label: 'Car Loan Payments:' },
        { name: 'studentLoanPayments', label: 'Student Loan Payments:' },
        { name: 'creditCardPayments', label: 'Credit Card Payments:' },
        { name: 'personalLoanPayments', label: 'Personal Loan Payments:' },
        { name: 'otherDebtPayments', label: 'Other Debt Payments:' }
    ];

    incomeFields = [
        { name: 'salaryWages', label: 'Salary/Wages:' },
        { name: 'bonusesCommissions', label: 'Bonuses/Commissions:' },
        { name: 'rentalIncome', label: 'Rental Income:' },
        { name: 'investmentIncome', label: 'Investment Income:' },
        { name: 'otherIncomeSources', label: 'Other Income Sources:' }
    ];

    constructor(private fb: FormBuilder) {
        this.DebttoIncomeRatioCalculatorForm = this.fb.group({
            mortgagePayments: [null, this.negativeValidator],
            carLoanPayments: [null, this.negativeValidator],
            studentLoanPayments: [null, this.negativeValidator],
            creditCardPayments: [null, this.negativeValidator],
            personalLoanPayments: [null, this.negativeValidator],
            otherDebtPayments: [null, this.negativeValidator],
            salaryWages: [null, this.negativeValidator],
            bonusesCommissions: [null, this.negativeValidator],
            rentalIncome: [null, this.negativeValidator],
            investmentIncome: [null, this.negativeValidator],
            otherIncomeSources: [null, this.negativeValidator],
        });
    }

    ngOnInit(): void {
        this.DebttoIncomeRatioCalculatorForm.valueChanges.subscribe(() => {
            this.resetOutputs();
        });
    }

    calculate() {
        if (this.isFormValid() && !this.hasNegativeValue) {
            const formValues = this.DebttoIncomeRatioCalculatorForm.value;

            const totalDebtPayments = formValues.mortgagePayments + formValues.carLoanPayments + formValues.studentLoanPayments +
                formValues.creditCardPayments + formValues.personalLoanPayments + formValues.otherDebtPayments;

            const totalMonthlyIncome = formValues.salaryWages + formValues.bonusesCommissions + formValues.rentalIncome +
                formValues.investmentIncome + formValues.otherIncomeSources;
            
            if (totalDebtPayments <= 0 || totalMonthlyIncome <= 0) {
                this.errorMessage = "Total debt payments and total monthly income must be greater than zero.";
                this.dtiRatio = 0;
                return;
            }

            this.dtiRatio = (totalDebtPayments / totalMonthlyIncome);
            this.errorMessage = '';
        } else {
            this.errorMessage = "Please fill out all required fields correctly.";
            this.dtiRatio = 0;
        }
    }

    resetForm() {
        this.DebttoIncomeRatioCalculatorForm.reset();
        this.resetOutputs();
        this.errorMessage = '';
        this.hasNegativeValue = false;
    }

    checkForNegativeValues() {
        const formValues = this.DebttoIncomeRatioCalculatorForm.value;
        this.hasNegativeValue = Object.keys(formValues).some(key => formValues[key] < 0);
        if (this.hasNegativeValue) {
            this.dtiRatio = 0;
        }
    }

    negativeValidator(control: AbstractControl): ValidationErrors | null {
        if (control.value < 0) {
            return { negativeValue: true };
        }
        return null;
    }

    isFormValid(): boolean {
        const atLeastOneIncomeFieldValid = this.incomeFields.some(field => {
            const control = this.DebttoIncomeRatioCalculatorForm.get(field.name);
            return control?.value !== null && control?.value > 0;
        });
        return atLeastOneIncomeFieldValid && !this.hasNegativeValue;
    }

    private resetOutputs(): void {
        this.dtiRatio = 0;
    }
}
