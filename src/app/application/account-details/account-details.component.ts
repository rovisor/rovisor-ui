import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountDetailsService } from './state/account-details.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { AccountDetail, createAccountDetail } from './state/account-details.model';

@Component({
  selector: 'app-account-details-statement',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private accountId = '';
  public accountInfo: AccountDetail = createAccountDetail(null);
  public accountName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private accountDetailsService: AccountDetailsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((routeParams: any) => {
      this.accountId = routeParams.id || '';
      this.getAccountDetails();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getAccountDetails() {
    this.subscription.add(this.accountDetailsService.getAccountDetails(this.accountId).subscribe((result: AccountDetail) => {
      console.log(result);
      this.accountInfo = result;
    }));
  }

  openUploadModal() {
    const modalRef = this.modalService.open(UploadStatementComponent, { centered: true, size: 'lg', });
    modalRef.componentInstance.account = this.accountInfo;
  }
}
