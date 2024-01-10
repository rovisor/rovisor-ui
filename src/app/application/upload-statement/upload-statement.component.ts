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
  missingColumns: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) { }

  upload(): void {
    if (this.uploadForm?.valid && this.validateRequiredColumns()) {
    }
    else {
      // Focus the file input if errors exist
    }
  }

  cancel(): void {
    this.activeModal.close();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0]; // Retrieve the selected file from the input event

    if (file) {
      const maxFileSize = 10 * 1024 * 1024;
      if (file.size > maxFileSize) {

        console.error('File size exceeds the limit');
        return;
      }
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
      file: new FormControl('', [Validators.required,]),
    });
  }
  csvFileValidator = (control: FormControl): { [key: string]: boolean } | null => {
    if (control.value) {
      const fileName = control.value.name;
      const extensionIndex = fileName.lastIndexOf('.') + 1;
      const extension = fileName.slice(extensionIndex); // extracts a portion of the string.

      if (extension !== 'csv') {
        return { 'invalidExtension': true };
      }
    }
    return null;
  };
  validateRequiredColumns(): boolean {
    const validColumns = ['Date', 'Activity', 'Source/Destination', 'Debit', 'Credit', 'Wallet Txn ID'];
    const missingColumns = validColumns.filter(column => !this.csvHeaders.includes(column));
    this.missingColumns = missingColumns;

    if (missingColumns.length > 0) {
      return false;
    }


    for (let rowIndex = 0; rowIndex < this.csvData.length; rowIndex++) {
      const row = this.csvData[rowIndex];

      for (let columnIndex = 0; columnIndex < validColumns.length; columnIndex++) {

        const column = validColumns[columnIndex];
        const columnIndexInRow = this.csvHeaders.indexOf(column);

        if (column == 'Debit' || column == 'Credit') {
          continue;
        }

        if (!row[columnIndexInRow]) {
          return false;
        }
      }


      const debitIndex = this.csvHeaders.indexOf('Debit');
      const creditIndex = this.csvHeaders.indexOf('Credit');
      const debitValue = row[debitIndex];
      const creditValue = row[creditIndex];

      if ((debitValue && creditValue) || (!debitValue && !creditValue)) {
        console.error(`There should be data in only one column either Debit or Credit per row.`);
        return false;
      }
    }
    return true;
  }


}