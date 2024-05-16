import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountDetailsService } from './state/account-details.service';
import { FormBuilder } from '@angular/forms';
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
  public weekStartDate: Date = new Date();
  public weekEndDate: Date = new Date();
  public isPreviousWeekAvailable: boolean = true;
  public isNextWeekAvailable: boolean = true;
  public currentWeekData: any = {
    range: 'This Week (16-22 Oct 2023)',
    data: [
      { day: 'SUN', credit: 150.00, debit: 300.00 },
      { day: 'MON', credit: 657.00, debit: 90.00 },
      { day: 'TUE', credit: 80.00, debit: 111.00 },
      { day: 'WED', credit: 60.00, debit: 0.00 },
      { day: 'THU', credit: 435.00, debit: 213.00 },
      { day: 'FRI', credit: 4000.00, debit: 600.00 },
      { day: 'SAT', credit: 200.00, debit: 3000.00 },
    ]
  };

  public previousWeekData: any = {
    range: 'Previous Week (9-15 Oct 2023)',
    data: [
      { day: 'SUN', credit: 250.00, debit: 200.00 },
      { day: 'MON', credit: 600.00, debit: 150.00 },
      { day: 'TUE', credit: 80.00, debit: 70.00 },
      { day: 'WED', credit: 40.00, debit: 20.00 },
      { day: 'THU', credit: 300.00, debit: 100.00 },
      { day: 'FRI', credit: 3000.00, debit: 500.00 },
      { day: 'SAT', credit: 150.00, debit: 1200.00 },
    ]
  };

  public displayData: any;

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


    this.updateDisplayData(this.currentWeekData);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAccountDetails() {
    this.subscription.add(this.accountDetailsService.getAccountDetails(this.accountId).subscribe((result: AccountDetail) => {
      this.accountInfo = result;
    }));
  }

  openUploadModal() {
    this.modalService.open(UploadStatementComponent, { centered: true, size: 'lg' });
  }

  onPreviousWeek() {
    this.updateDisplayData(this.previousWeekData);
  }

  onNextWeek() {
    this.updateDisplayData(this.currentWeekData);
  }

  updateDisplayData(weekData: any) {
    this.displayData = weekData;
    this.parseWeekRange(weekData.range);
  }

  parseWeekRange(weekRange: string) {
    const dates = weekRange.match(/\d{2}-\d{2}-\d{4}/g);
    if (dates && dates.length === 2) {
      this.weekStartDate = new Date(dates[0]);
      this.weekEndDate = new Date(dates[1]);
    }
  }


  formatAmount(amount: number): string {
    return amount >= 0 ? `₹${amount.toFixed(2)}` : `-₹${Math.abs(amount).toFixed(2)}`;
  }

}
