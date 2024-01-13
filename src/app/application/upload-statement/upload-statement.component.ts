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
    
    if (this.uploadForm.valid ) {
      this.isButtonsVisible = true;
    } else {
      this.isButtonsVisible = false;
    }
  }

  cancel(): void {

    this.activeModal.close();

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const maxFileSize = 10 * 1024 * 1024;
      if (file.size > maxFileSize) {
        
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
        const content = e.target.result;
        this.parseCSV(content);
      };

      reader.readAsText(file);
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
    this.isButtonsVisible = false;
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

        if (column == 'Debit') {
          const debitValue = row[columnIndexInRow];
          if (isNaN(parseFloat(debitValue))) {
            return false;
          }
        } else if (column == 'Credit') {
          const creditValue = row[columnIndexInRow];
          if (isNaN(parseFloat(creditValue))) {
            return false;
          }
        } else {
          if (!row[columnIndexInRow]) {
            return false;
          }
        }

        if (column === 'Date') {
          const dateValue = row[columnIndexInRow];
          if (!this.isValidDate(dateValue)) {
            return false;
          }
        }


      }

      const debitIndex = this.csvHeaders.indexOf('Debit');
      const creditIndex = this.csvHeaders.indexOf('Credit');
      const debitValue = row[debitIndex];
      const creditValue = row[creditIndex];

      if ((debitValue && creditValue) || (!debitValue && !creditValue)) {
        return false;
      }
    }

    return true;
  }


  isValidDate(dateValue: string): boolean {
    const currentDate = new Date();
    const inputDate = new Date(dateValue);


    return (!isNaN(inputDate.getTime()) && inputDate <= currentDate && !isNaN(inputDate.getHours()) && !isNaN(inputDate.getMinutes()) && !isNaN(inputDate.getSeconds()) && inputDate.getMilliseconds() === 0);
  }
}
