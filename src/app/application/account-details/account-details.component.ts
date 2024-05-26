import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountDetailsService } from './state/account-details.service';
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
  public currentDate: Date = new Date();
  public isPreviousWeekAvailable: boolean = true;
  public isNextWeekAvailable: boolean = false;
  public displayData: any;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private accountDetailsService: AccountDetailsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((routeParams: any) => {
      this.accountId = routeParams.id || '';
      this.getAccountDetails();
    });

    this.updateDisplayData(this.getWeekData(this.currentDate));
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
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateDisplayData(this.getWeekData(this.currentDate));
    this.isNextWeekAvailable = true;
  }

  onNextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateDisplayData(this.getWeekData(this.currentDate));
    if (this.currentDate >= new Date()) {
      this.isNextWeekAvailable = false;
    }
  }

  updateDisplayData(weekData: any) {
    this.displayData = weekData;
  }

  getWeekData(date: Date): any {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return {
      range: `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`,
      data: this.generateWeekData(startDate)
    };
  }

  generateWeekData(startDate: Date): any[] {
    const data = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      data.push({
        day: this.formatDay(date),
        credit: this.getRandomAmount(),
        debit: this.getRandomAmount()
      });
    }
    return data;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatDay(date: Date): string {
    return date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  }

  getRandomAmount(): number {
    return Math.floor(Math.random() * 1000);
  }

  formatAmount(amount: number): string {
    return amount >= 0 ? `₹${amount.toFixed(2)}` : `-₹${Math.abs(amount).toFixed(2)}`;
  }
}