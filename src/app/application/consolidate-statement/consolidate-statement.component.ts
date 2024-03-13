import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsolidateStatementService } from './state/consolidate-statement.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-consolidate-statement',
  templateUrl: './consolidate-statement.component.html',
  styleUrls: ['./consolidate-statement.component.css']
})

export class ConsolidateStatementComponent implements OnInit, OnDestroy {
  minEndDate: any;
search() {
throw new Error('Method not implemented.');
}
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

  constructor(private formBuilder: FormBuilder, private consolidateStatement: ConsolidateStatementService) {}
  ngOnInit() {
    this.statementFiltersForm = this.formBuilder.group({
    fromDate: ['', Validators.required],
    toDate: [''],
    account:[''],
    type:['']
  });
    this.fetchStatements();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

        }
        fetchStatements(){
          this.subscription.add(this.consolidateStatement.fetchStatements().subscribe((result)=>{
            this.rows = result
          }))
        }  
        
        Account = [
          { id: 1, name: 'Paytm ' },
          { id: 2, name: 'G-pay' },
          { id: 3, name: 'HDFC' },
         
        ];
        type= [
          { id: 1, name: 'Credit' },
          { id: 2, name: 'Debit' },
        ];
        minEndDateChecking(){
          let fromDate= this.statementFiltersForm.get('fromDate');
          if( fromDate!== null || fromDate !== undefined){
           
          }
          
        }
      }

    
