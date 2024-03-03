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
  public accountForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private addAccountService: AddAccountService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      accountName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')],
      ],
      institutionName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      ],
      selectedAccount: ['', Validators.required],
      accountNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
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
