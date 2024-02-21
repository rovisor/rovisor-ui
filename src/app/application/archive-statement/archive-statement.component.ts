import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-archive-statement',
  templateUrl: './archive-statement.component.html',
  styleUrls: ['./archive-statement.component.css']
})

export class ArchiveStatementComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription = new Subscription();
  public rows: any[] = []; // Initialize rows as an empty array
  columns = [
    { prop: 'DateAndTime', name: 'DateAndTime' },
    { prop: 'Naration', name: 'Naration' },
    { prop: 'Amount', name:'Amount'},
    { prop: 'DebitCredit', name:'DebitCredit'},
    { prop: 'Account', name:'Account'},
  ];

  constructor(private http: HttpClient) {}




    
  


  ngOnInit(): void {
    
    this.fetchStatements();

  }
  fetchStatements(): void {
    const endpoint = ' http://localhost:5000/api/statement/statement'; 
    this.subscription.add(
      this.http.get<any[]>(endpoint).subscribe({
        next: (data) => {
          this.rows = data;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();

        }
        
       
       }
      

