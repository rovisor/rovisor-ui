import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { AddAccountComponent } from '../add-account/add-account.component';
import { AccountMappingComponent } from '../account-mapping/account-mapping.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(private modalService: NgbModal) { }

  openAddAccountModal() {
    this.modalService.open(AddAccountComponent, { centered: true, size: 'md', });
  }
  openAddAccountModal1() {
    this.modalService.open(AccountMappingComponent, { size: 'lg' });
  }
}
