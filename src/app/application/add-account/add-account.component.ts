import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddAccountService } from './state/add-account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private addAccountService: AddAccountService,
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
      selectedAccount: ['', Validators.required],
      accountNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
    });
    this.accountForm.patchValue({
      selectedAccount: this.accountTypes[0] 
    });
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const accountData = new FormData();
    accountData.append('file', this.accountForm.get('file')!.value);
    this.addAccountService.addAccount(accountData).subscribe( // The subscribe method is used to handle the response from the server.
      (response: any) => {
        this.toastr.success(response.message, 'Success');

      },
      (error: any) => {
        this.toastr.error(error.message, 'Error');
      }
    );
    if (this.accountForm.valid) {
      this.toastr.success('Account added successfully', 'Success!');
    }
  }
}