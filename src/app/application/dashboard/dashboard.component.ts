import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { AddAccountComponent } from '../add-account/add-account.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  toDate: any;
  fromDate: any;
navigateToConsolidatedStatement() {
throw new Error('Method not implemented.');
}

  transactionType = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Credit' },
    { id: 3, name: 'Debit' },
    { id: 4, name: 'Transfers' },
  ];
  category = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Income' },
    { id: 3, name: 'Expensive' },
    { id: 4, name: 'Investment' },
  ];
  minToDate: any;
  maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };

  public statementFiltersForm!: FormGroup;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    fromDate:[null]
    
  }
  viewConsolidatedStatement() {
   
    const queryParams = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      transactionType: this.transactionType,
      category: this.category
    };
    this.router.navigate(['/consolidate-statement'], { queryParams });
  }

  updateMinToDate(selectedDate: NgbDateStruct | null) {
    if (selectedDate) {
      this.minToDate = selectedDate;
    }
  }
  openAddAccountModal() {
    this.modalService.open(AddAccountComponent, { centered: true, size: 'md', });
  }

}
