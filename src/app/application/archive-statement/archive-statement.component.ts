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
  public rows: any[] = []; // Initialize rows as an empty array
  columns = [
    { prop: 'TransactionDate', name: 'DateAndTime' },
    { prop: 'TransactionDescription', name: 'Naration' },
    { prop: 'TransactionAmount', name:'Amount'},
    { prop: 'TransactionType', name:'DebitCredit'},
    { prop: 'TransactionAccount', name:'Account'},
  ];

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
       
       }
      

