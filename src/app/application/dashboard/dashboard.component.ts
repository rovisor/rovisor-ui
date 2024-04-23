import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAccountComponent } from '../add-account/add-account.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
;

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
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router) { }


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
  openConsolidatedStatement() {
    const selectedFilters = {
      fromDate: this.statementFiltersForm.value?.fromDate,
      toDate: this.statementFiltersForm.value?.toDate,
      transactionType: this.statementFiltersForm.value?.transactionType,
      category: this.statementFiltersForm.value?.category
    };
  
    // Constructing query parameters string
    let queryParams = '';
    for (const key in selectedFilters) {
      if (selectedFilters.hasOwnProperty(key) && selectedFilters[key]) {
        queryParams += `${key}=${selectedFilters[key]}&`;
      }
    }
    // Remove trailing '&' if exists
    if (queryParams.length > 0) {
      queryParams = queryParams.slice(0, -1);
    }
  
    // Navigate to consolidated statement component with query parameters
    this.router.navigate(['/consolidated-statement'], { queryParams });
  }
}
