import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsolidateStatementService } from './state/consolidate-statement.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


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
    { prop: 'TransactionDate', name: 'DateAndTime' },
    { prop: 'TransactionDescription', name: 'Naration' },
    { prop: 'TransactionAmount', name:'Amount'},
    { prop: 'TransactionType', name:'DebitCredit'},
    { prop: 'TransactionAccount', name:'Account'},
  ];
  model: any;
  selectedItem: any;
  selecteditem: any;

  constructor(private formBuilder: FormBuilder, private consolidateStatement: ConsolidateStatementService) {}
  ngOnInit() {
    this.statementFiltersForm = this.formBuilder.group({
    fromDate: new FormControl (''),
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
        validatedob(control: FormControl): {[key:string]:boolean} | null {
          const maxdob = new Date();
          maxdob.setFullYear(maxdob.getFullYear() - 87);
      
          const selectedDate = new Date(control.value);
          if (control.value && new Date(control.value) > new Date()) {
            return { futureDate: true };
          }
        }
      }
    
