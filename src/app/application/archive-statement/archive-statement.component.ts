import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArchiveStatementService } from './state/archive-statement.service';


@Component({
  selector: 'app-archive-statement',
  templateUrl: './archive-statement.component.html',
  styleUrls: ['./archive-statement.component.css']
})

export class ArchiveStatementComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription = new Subscription();
  public rows: any[] = []; 
  columns = [
    { prop: 'TransactionDate', name: 'DateAndTime' },
    { prop: 'TransactionDescription', name: 'Naration' },
    { prop: 'TransactionAmount', name:'Amount'},
    { prop: 'TransactionType', name:'DebitCredit'},
    { prop: 'TransactionAccount', name:'Account'},
  ];
model: any;
selectedItem: any;
selecteditem: any;

  constructor(private archiveStatement:ArchiveStatementService) {}
  ngOnInit(): void {
    
    this.fetchStatements();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

        }
        fetchStatements(){
          this.subscription.add(this.archiveStatement.fetchStatements().subscribe((result)=>{
            console.log("result",result);
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
       }
    
