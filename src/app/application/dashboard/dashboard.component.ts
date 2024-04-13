import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { AddAccountComponent } from '../add-account/add-account.component';
import { FormGroup,FormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  items = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Credit' },
    { id: 3, name: 'Debit' },
    { id: 4, name:'Tranfer'},
  ];
  items2 = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Income' },
    { id: 3, name: 'EXpensive' },
    { id: 4, name:'Investment'},
  ];
  
  model: NgbDateStruct | undefined;

openAddAccountModal() {
  this.modalService.open(AddAccountComponent, { centered: true, size: 'md', });
}

minToDate: any;
maxDate={year:new Date().getFullYear(),month: new Date().getMonth()+1, day: new Date().getDate()};

  public statementFiltersForm!: FormGroup;
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    this.model = { year: 2024, month: 4, day: 12 }
}
}
