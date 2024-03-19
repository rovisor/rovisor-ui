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
   
    this.mappingForm = this.formBuilder.group({
      date: [''], 
      narrations: [''],
      debitAmount: [''],
      creditAmount: [''],
      balance: [''],
    });

   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    
  }
}
