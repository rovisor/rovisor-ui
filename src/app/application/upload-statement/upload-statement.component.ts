import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './upload-statement.component.html',
  styleUrls: ['./upload-statement.component.css']
})
export class UploadStatementComponent implements OnInit {
  public uploadForm!: FormGroup;
  isButtonsVisible: boolean = false;


  validateForm(): boolean {

    return true;
  }

  upload(): void {
    if (this.validateForm()) {

    }
  }

  cancel(): void {
    if (this.validateForm()) {
    }

  }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl('', [Validators.required])

    });

  }

  updateButtonsVisibility(): void {
    this.isButtonsVisible = this.validateForm();
  }
}
