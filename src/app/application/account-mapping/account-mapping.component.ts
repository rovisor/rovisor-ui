import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountMappingService } from './state/account-mapping.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-mapping-statement',
  templateUrl: './account-mapping.component.html',
  styleUrls: ['./account-mapping.component.css'],
})
export class AccountMappingComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private accountMappingService: AccountMappingService
  ) {}
  ngOnInit() {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
