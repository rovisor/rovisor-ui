import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './upload-statement.component.html',
  styleUrls: ['./upload-statement.component.css'],
})
export class UploadStatementComponent implements OnInit {
  public uploadForm!: FormGroup;
  isButtonsVisible: boolean = false;
  csvData: any[] = [];
  csvHeaders: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) { }

  upload(): void {
    if (this.uploadForm?.valid) {
    }
  }

  cancel(): void {
    this.activeModal.close();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0]; // Retrieve the selected file from the input event

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const content = e.target.result; // Get the content of the file
        this.parseCSV(content);
      };

      reader.readAsText(file); // Read the file as text
    }
  }

  parseCSV(content: string): void {
    const rows = content.split('\n'); // Split the content into rows using newline as the delimiter
    this.csvHeaders = rows[0].split(',');
    this.csvData = [];
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].split(',');
      this.csvData.push(cells);
    }
  }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
    });
  }
}
