import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountMappingService } from './state/account-mapping.service';

@Component({
  selector: 'app-account-mapping-statement',
  templateUrl: './account-mapping.component.html',
  styleUrls: ['./account-mapping.component.css'],
})
export class AccountMappingComponent implements OnInit, OnDestroy {
  public dates: string[] = [" "];
  public narrations: string[] = [" "];
  public debitAmounts: string[] = [" "];
  public creditAmounts: string[] = [" "];
  public balances: string[] = [" "];
  public mappingForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private accountMappingService: AccountMappingService
  ) { }

  ngOnInit() {
    // Initialize your form controls here
    this.mappingForm = this.formBuilder.group({
      date: [''], // Initialize with default value if needed
      narrations: [''],
      debitAmount: [''],
      creditAmount: [''],
      balance: [''],
    });

    // Subscribe to form value changes or other observables if necessary
    // Example:
    // this.subscription.add(
    //   this.mappingForm.valueChanges.subscribe((value) => {
    //     // Handle form value changes
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    // Handle form submission here
    // Example:
    // const formData = this.mappingForm.value;
    // Call your service or perform necessary actions
  }
}
