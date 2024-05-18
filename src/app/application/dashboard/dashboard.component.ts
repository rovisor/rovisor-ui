import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { AddAccountComponent } from '../add-account/add-account.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public statementFiltersForm!: FormGroup;
  public searchForm!: FormGroup;
  public minToDate: any;
  public maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  public transactionTypeList = [
      { id: 1, name: 'All' },
      { id: 2, name: 'Credit' },
      { id: 3, name: 'Debit' },
      { id: 4, name: 'Transfers' },
    ];
  public categoryList = [
      { id: 1, name: 'All' },
      { id: 2, name: 'Income' },
      { id: 3, name: 'Expensive' },
      { id: 4, name: 'Investment' },
    ];
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.statementFiltersForm = this.formBuilder.group({
      fromDate: [null],
      toDate: [null],
      category:[null],
      transactionType:[null]
    });
    this.searchForm = this.formBuilder.group({
      search: [null]
    })
  }

  onDateSelect() {
    this.minToDate = this.statementFiltersForm.get('fromDate')?.value
  }

  openAddAccountModal() {
    this.modalService.open(AddAccountComponent, { centered: true, size: 'md', });
  }
    
  navigateToConsolidatedStatement() {
  }
}