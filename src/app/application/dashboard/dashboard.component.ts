import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  
openAddAccountModal() {
  this.modalService.open(AddAccountComponent, { centered: true, size: 'md', });
}
  public statementFiltersForm!: FormGroup;
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,) { }
  ngOnInit(): void {
    this.statementFiltersForm = this.formBuilder.group({
      fromDate: [null],
      toDate: [null],
    this:fetchStatements(),
      })

  fetchStatements();{
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
}
}
  }
}
function fetchStatements() {
  throw new Error('Function not implemented.');
}

