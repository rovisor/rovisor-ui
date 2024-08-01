import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Pricing',
  templateUrl: './Pricing.component.html',
  styleUrls: ['./Pricing.component.css']
})
export class PricingComponent {
  pricingForm: FormGroup;

  cost: number = 0;
  price: number = 0;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.pricingForm = this.fb.group({
      productionCost: [null, Validators.required],
      fulfillmentCost: [null, Validators.required],
      customerAcquisitionCost: [null, Validators.required],
      averageSubscriptionMonths: [null, Validators.required],
      ProfitMargin: [null, Validators.required],
    });
  }

  calculate() {
    if (this.pricingForm.valid) {
      const productionCost = this.pricingForm.value.productionCost;
      const fulfillmentCost = this.pricingForm.value.fulfillmentCost;
      const customerAcquisitionCost = this.pricingForm.value.customerAcquisitionCost;
      const averageSubscriptionMonths = this.pricingForm.value.averageSubscriptionMonths;
      const ProfitMargin = this.pricingForm.value.ProfitMargin/100;

      if (productionCost <= 0 ||  averageSubscriptionMonths <= 0)  {
        this.errorMessage = "Cost to produce item and Average months subscribed values must be  greater than zero.";
        return; 
      }
      if (fulfillmentCost < 0 || customerAcquisitionCost <0 || ProfitMargin <0){
        this.errorMessage = "Cost to pack & fulfill order, Cost to acquire a customer and Profit Margin values must be  non-negative";
        return;
      }
      if (ProfitMargin >= 1) {
        this.errorMessage = "Profit margin must be less than 100%.";
        return;
      }
    
      this.cost = (productionCost+ fulfillmentCost+(customerAcquisitionCost/averageSubscriptionMonths));
      
      this.price = ((this.cost)/(1-ProfitMargin));


      this.errorMessage = '';
    } else {
      this.errorMessage = "Please fill out all required fields.";
    }
  }

  resetForm() {
    this.pricingForm.reset();
    this.cost = 0;
    this.price = 0;
    this.errorMessage = '';
  }
}
