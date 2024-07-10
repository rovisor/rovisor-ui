import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './Lease-vs-Buy.component.html',
  styleUrls: ['./Lease-vs-Buy.component.css']
})
export class LeaseVsBuyComponent {
    payoffCalculatorForm: FormGroup;

    projectedMonths: number = 0;
    buy : number=0;
    test : number=0;
    errorMessage: string = '';
  
    constructor(private fb: FormBuilder) {
      this.payoffCalculatorForm = this.fb.group({
        LeasePayment: [null, Validators.required],	
        LeaseTerm: [null, Validators.required],
        LeaseDown: [null, Validators.required],
        ResidualValue : [ null,Validators.required],
        AdditionalFees: [ null, Validators.required],
        PurchasePrice: [ null,Validators.required],
        Term:[ null,Validators.required],
        InterestRate: [ null,Validators.required],
        DownPayment: [ null,Validators.required],
        BuyAdditional: [null,Validators.required],
        TaxRate: [null, Validators.required]
      });
    }
  
    calculate() {
      if (this.payoffCalculatorForm.valid) {
        const LeasePayment = this.payoffCalculatorForm.value.LeasePayment;
        const LeaseTerm = this.payoffCalculatorForm.value.LeaseTerm;
        const LeaseDown = this.payoffCalculatorForm.value.LeaseDown;
        const ResidualValue = this.payoffCalculatorForm.value.ResidualValue;
        const AdditionalFees = this.payoffCalculatorForm.value.AdditionalFees
  
        if (LeasePayment <= 0 || LeaseTerm <= 0 || LeaseDown <= 0 || ResidualValue<0 || AdditionalFees<0) {
          this.errorMessage = "All values must be greater than zero.";
          return; 
        }
        
        
        this.projectedMonths =((LeasePayment*LeaseTerm)+LeaseDown+AdditionalFees-ResidualValue);

        const PurchasePrice = this.payoffCalculatorForm.value.PurchasePrice;
        const Term = this.payoffCalculatorForm.value.Term;
        const InterestRate = this.payoffCalculatorForm.value.InterestRate;
        const DownPayment = this.payoffCalculatorForm.value.DownPayment;
        const BuyAdditional = this.payoffCalculatorForm.value.BuyAdditional;
        const TaxRate = this.payoffCalculatorForm.value.TaxRate;

        if ( PurchasePrice <=0 || Term <=0 || InterestRate <=0 || DownPayment<=0 || BuyAdditional<0 || TaxRate <0){
          this.errorMessage = "All value must be greater than zero ";
          return;
        }

        const MonthlyIntresetRate = InterestRate/12/100;
        const principal= PurchasePrice-DownPayment
        const NumberofPayment = Term*12;
        const Tax = PurchasePrice * (TaxRate/100); 
        const TotalTax = Tax *Term;
        const MonthlyLoanPayment = (principal*(MonthlyIntresetRate*(Math.pow((1 +(MonthlyIntresetRate)),(NumberofPayment))))/((Math.pow((1+MonthlyIntresetRate),(NumberofPayment))-1)));

        const loanPayment = (MonthlyLoanPayment*NumberofPayment) ;

        this.buy =(loanPayment+DownPayment+BuyAdditional+ TotalTax );
        
        this.test= Term;

        this.errorMessage = '';
      } else {
        this.errorMessage = "Please fill out all required fields.";
      }
    }
  
    resetForm() {
      this.payoffCalculatorForm.reset();
      this.projectedMonths = 0;
      this.buy = 0;
      this.errorMessage = '';
    }
}