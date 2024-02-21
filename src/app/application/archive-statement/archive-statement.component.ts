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
force: any;

public getJasonValue:any;
public postJasonValue:any;

  constructor(private http:HttpClient) {}
    
  


  ngOnInit(): void {
    this.getMethod();
   
  }

  ngOnDestroy(): void {
   
        }
        public getMethod(){
          this.http.get(' http://localhost:5000/api/statement/statement').subscribe((data)=>{
            console.log(data);
            this.getJasonValue
          });
        }
        public postMethod(){
          this.http.post('http://localhost:5000/api/statement/statement',{}).subscribe((data)=>{
            console.log(data);
            this.postJasonValue
          });
        }
      
       
       }
      

