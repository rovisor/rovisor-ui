import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddAccountService } from './state/add-account.service';

@Component({
  selector: 'app-add-account-statement',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent implements OnInit, OnDestroy {
  accountTypes = [
    "Savings Account",
    "Wallet",
    "Current Account",
    "Loan Account",
    "Investment Account"
  ];

  public accountForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      accountName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
      ],
      institutionName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
      ],
      accountSelect: ['', Validators.required],
      accountNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
    });
    this.accountForm.patchValue({
      accountSelect: this.accountTypes[0]
    });
    this.accountForm.valueChanges.subscribe(() => {
      for (const field in this.accountForm.controls) {
        if (this.accountForm.controls[field].invalid) {
          this.accountForm.controls[field].markAsTouched();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.toastr.success('Account added successfully', 'Success!');
    }
    
  }

}
