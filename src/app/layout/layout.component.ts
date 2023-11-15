import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UploadStatementComponent } from "../upload-statement/upload-statement.component";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.css"],
    })
export class LayoutComponent {
    constructor(private modalService: NgbModal) { }
  
    uploadStatement() {
      this.modalService.open(UploadStatementComponent);
    }

}