import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsolidateStatementService } from './state/consolidate-statement.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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
  selectedItem: any;
  selecteditem: any;
  minToDate: any;
  maxDate={year:new Date().getFullYear(),month: new Date().getMonth()+1, day: new Date().getDate()};
  public accountList = [
    { id: 1, name: 'Paytm ' },
    { id: 2, name: 'G-pay' },
    { id: 3, name: 'HDFC' }
  ];
  public transactionTypeList= [
    { id: 1, name: 'Credit' },
    { id: 2, name: 'Debit' }
  ];
  public page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'TransactionDate',
    orderDir: 'desc'
  };


  constructor(private formBuilder: FormBuilder, private consolidateStatement: ConsolidateStatementService) {}
  
  ngOnInit() {
    this.statementFiltersForm = this.formBuilder.group({
    fromDate: [null],
    toDate: [null],
    account:[null],
    transactionType:[null]
    });
    this.fetchStatements();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchStatements(){
    this.subscription.add(this.consolidateStatement.fetchStatements(this.statementFiltersForm.value).subscribe((result)=>{
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
    
