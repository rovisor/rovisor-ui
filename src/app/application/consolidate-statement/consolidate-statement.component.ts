import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsolidateStatementService } from './state/consolidate-statement.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-consolidate-statement',
  templateUrl: './consolidate-statement.component.html',
  styleUrls: ['./consolidate-statement.component.css']
})

export class ConsolidateStatementComponent implements OnInit, OnDestroy {
 
  public statementFiltersForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  public rows: any[] = []; 
  public columns = [
    { prop: 'TransactionDate', name: 'Date' },
    { prop: 'TransactionAccount', name:'Account'},
    { prop: 'TransactionDescription', name: 'Naration' },
    { prop: 'TransactionType', name:'DebitCredit'},
    { prop: 'TransactionAmount', name:'Balance'},
  
  ];
  model: any;
  minToDate: any;
  maxDate={year:new Date().getFullYear(),month: new Date().getMonth()+1, day: new Date().getDate()};
  public accountList = [];
  public transactionTypeList= [
    { id:'Credit', name: 'Credit' },
    { id:'Debit', name: 'Debit' }
  ];
  public page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'TransactionDate',
    orderDir: 'desc'
  };


  constructor(private formBuilder: FormBuilder, private consolidateStatementService: ConsolidateStatementService,private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.statementFiltersForm = this.formBuilder.group({
      fromDate: [null],
      toDate: [null],
      account:[null],
      transactionType:[null]
    });
    this.route.queryParams.subscribe(params => {
      const filters = params;

      this.statementFiltersForm.patchValue({
        fromDate: filters['fromDate'] || null,
        toDate: filters['toDate'] || null,
        transactionType: filters['transactionType'] || null,
      });
  
    
      this.fetchStatements();
    });
    
    this.getAccounts();
    this.fetchStatements();
    
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAccounts() {
    this.subscription.add(this.consolidateStatementService.getAccounts().subscribe((list) => {
      this.accountList = list;
    }));
  }

  fetchStatements(){
    let fromDate =  null;
    if(this.statementFiltersForm.value.fromDate) {
      fromDate = DateTime.fromObject({
        year: this.statementFiltersForm.value.fromDate?.year,
        month: this.statementFiltersForm.value.fromDate?.month,
        day: this.statementFiltersForm.value.fromDate?.day,
      }).toFormat('yyyy-MM-dd');
    } 

    let toDate =  null;
    if(this.statementFiltersForm.value.toDate) {
      toDate = DateTime.fromObject({
        year: this.statementFiltersForm.value.toDate?.year,
        month: this.statementFiltersForm.value.toDate?.month,
        day: this.statementFiltersForm.value.toDate?.day,
      }).toFormat('yyyy-MM-dd');
    } 

    let params = {
      FromDate:  fromDate,
      ToDate: toDate,
      TransactionType : this.statementFiltersForm.value.transactionType,
      Account:  this.statementFiltersForm.value.account,
  }
    this.subscription.add(this.consolidateStatementService.fetchStatements(params).subscribe((result)=>{
      this.rows = result;
      this.page.count = result.length;
    }))
  }

  onDateSelect() {
    this.minToDate = this.statementFiltersForm.get('fromDate')?.value
  }

  search() {
    this.fetchStatements();
  }

  reset() {
    this.statementFiltersForm.reset();
  }

  onPageChange(pageInfo: { count?: number, pageSize?: number, limit?: number, offset: number }) {
    this.page.offset = pageInfo.offset;
    this.fetchStatements();
  }

  onSortChange (sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.fetchStatements();
  }
} 
    
