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
  public weekStartDate: Date = new Date(); 
  public weekEndDate: Date = new Date(); 
  public isPreviousWeekAvailable: boolean = false;
  public isNextWeekAvailable: boolean = false;

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

    this.parseWeekRange("This Week (16-22 Oct 2023)");

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
    this.modalService.open(UploadStatementComponent, { centered: true, size: 'lg' });
  }
  onPreviousWeek() {
    // Calculate the start and end dates of the previous week
    const previousWeekStartDate = new Date(this.weekStartDate);
    previousWeekStartDate.setDate(previousWeekStartDate.getDate() - 7);
    const previousWeekEndDate = new Date(this.weekEndDate);
    previousWeekEndDate.setDate(previousWeekEndDate.getDate() - 7);

    // Optionally, check if data for the previous week is available
    // You can replace this with your actual logic to check data availability
    // For now, let's assume it's always available
    const isPreviousWeekAvailable = true;

    if (isPreviousWeekAvailable) {
      // Enable the left button since previous week data is available
      this.isPreviousWeekAvailable = true;

      // Update the displayed week's date range
      this.weekStartDate = previousWeekStartDate;
      this.weekEndDate = previousWeekEndDate;

      
      this.getAccountDetails();
    } else {
      
      this.isPreviousWeekAvailable = false;
    }
  }

  onNextWeek() {
    // Calculate the start and end dates of the next week
    const nextWeekStartDate = new Date(this.weekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    const nextWeekEndDate = new Date(this.weekEndDate);
    nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 7);

   
    const isNextWeekAvailable = true;

    if (isNextWeekAvailable) {
    
      this.isNextWeekAvailable = true;

      // Update the displayed week's date range
      this.weekStartDate = nextWeekStartDate;
      this.weekEndDate = nextWeekEndDate;

    
      this.getAccountDetails();
    } else {
      
      this.isNextWeekAvailable = false;
    }
  }

  parseWeekRange(weekRange: string) {
    const dates = weekRange.match(/\d{2}-\d{2}-\d{4}/g);
    if (dates && dates.length === 2) {
      this.weekStartDate = new Date(dates[0]);
      this.weekEndDate = new Date(dates[1]);
    }
  }
}
