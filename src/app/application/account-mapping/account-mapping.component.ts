import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountMappingService } from './state/account-mapping.service';

@Component({
  selector: 'app-account-mapping-statement',
  templateUrl: './account-mapping.component.html',
  styleUrls: ['./account-mapping.component.css'],
})
export class AccountMappingComponent implements OnInit, OnDestroy {

  public mappingForm!: FormGroup;
  public csvHeaders: string[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private accountMappingService: AccountMappingService
  ) { }

  ngOnInit() {
    this.mappingForm = this.formBuilder.group({
      date: [''],
      narration: [''],
      debitAmount: [''],
      creditAmount: [''],
      balance: [''],
    });

    this.BalanceColumnHeaders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  BalanceColumnHeaders() {
    const noFieldOption = 'No field available';
    this.csvHeaders.push(noFieldOption);
  }

  onSubmit() {

  }
}
