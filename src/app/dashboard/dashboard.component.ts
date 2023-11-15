import { Component, ViewChild } from '@angular/core';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  constructor(private modalService: NgbModal) { }

  uploadStatement() {
    this.modalService.open(UploadStatementComponent);
  }
}
