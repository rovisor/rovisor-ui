import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './upload-statement.component.html',
  styleUrls: ['./upload-statement.component.css']
})
export class UploadStatementComponent implements OnInit {
  public uploadForm!: FormGroup;
  isButtonsVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal) { }

  upload(): void {
    if (this.uploadForm?.valid) {

    }
  }

  cancel(): void {
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl('', [Validators.required])

    });

  }
}
