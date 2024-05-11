import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddAccountService } from './state/add-account.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-account.statement',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent implements OnInit, OnDestroy {

  public accountTypes: string[] = [
    "Savings Account",
    "Wallet",
    "Current Account",
    "Loan Account",
    "Investment Account"
  ];

  public accountForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private addAccountService: AddAccountService) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      accountName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      institutionName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      accountType: [null, Validators.required],
      accountNumber: [null, [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get f() { return this.accountForm.controls; }

  onSubmit() {
    if (this.accountForm.valid) {
      const accountName = this.accountForm.value.accountName;
      const lastFourDigits = this.accountForm.value.accountNumber;
      const message = `Your account ${accountName} - ${lastFourDigits} has been added and can be accessed through the sidebar.`;

      this.addAccountService.addAccount(this.accountForm.value).subscribe(
        response => {
          this.toastr.success(message, 'Account Added');
          this.activeModal.close();
        },
        error => {
          this.toastr.error('Failed to add account', 'Error!');
        }
      );
    }
  }
}
