import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-archive-statement',
  templateUrl: './archive-statement.component.html',
  styleUrls: ['./archive-statement.component.css']
})

export class ArchiveStatementComponent implements OnInit, OnDestroy {
 
  private subscription: Subscription = new Subscription();
force: any;


  constructor() {}
    
  


  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
   
        }
       rows = [
          { DateAndTime: '1-feb-2024', Naration: 'Rachit',Amount:'5000', DebitCredit: 'credit',Account:'HDFC'},
          { DateAndTime: '2-feb-2024', Naration: 'Ramesh',Amount:'60000', DebitCredit: 'Debit',Account:'paytm'},
          { DateAndTime: '5-feb-2024', Naration: 'Ramkali',Amount:'4400', DebitCredit: 'credit',Account:'g-pay'},
          { DateAndTime: '13-feb-2024', Naration: 'Rajkumar',Amount:'4300', DebitCredit: 'Debit',Account:'Sbi'},
          { DateAndTime: '13-feb-2024', Naration: 'Rakesh',Amount:'100', DebitCredit: 'credit',Account:'Sbi'},
          { DateAndTime: '15-feb-2024', Naration: 'Rajendeer',Amount:'500', DebitCredit: 'Debit',Account:'HDFC'},
          { DateAndTime: '14-feb-2024', Naration: 'Rachit',Amount:'50', DebitCredit: 'credit',Account:'phonepay'},
          { DateAndTime: '17-feb-2024', Naration: 'Ram',Amount:'7000', DebitCredit: 'debit',Account:'paytm'},
          { DateAndTime: '11-feb-2024', Naration: 'Rachit',Amount:'500', DebitCredit: 'credit',Account:'g-pay'},
          { DateAndTime: '10-feb-2024', Naration: 'Ramishver',Amount:'6000', DebitCredit: 'Debit',Account:'HDFC'},
                 
        ];
      
        columns = [
          { prop: 'DateAndTime', name: 'DateAndTime' },
          { prop: 'Naration', name: 'Naration' },
          { prop: 'Amount', name:'Amount'},
          { prop: 'DebitCredit' ,name:'DebitCredit'},
          { prop: 'Account',name:'Account'},
        ];
       }
      

