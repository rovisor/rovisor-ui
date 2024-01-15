import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


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

    if (this.uploadForm.valid && this.validateRequiredColumns()) {
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
    const requiredColumns = ['Date', 'Activity', 'Source/Destination', 'Debit', 'Credit', 'Wallet Txn ID'];
    this.missingColumns = [];

    this.missingColumns = requiredColumns.filter(requiredColumn => !this.csvHeaders.includes(requiredColumn.trim()));

    for (let rowIndex = 0; rowIndex < this.csvData.length; rowIndex++) {
      const row = this.csvData[rowIndex];

      // Check if there are data in all required columns
      const missingDataColumns = requiredColumns.filter(requiredColumn => {
        const columnIndexInRow = this.csvHeaders.indexOf(requiredColumn.trim());
        return !row[columnIndexInRow]?.trim();
      });
      const debitIndex = this.csvHeaders.indexOf('Debit');
      const creditIndex = this.csvHeaders.indexOf('Credit');
      const debitValue = row[debitIndex]?.trim();
      const creditValue = row[creditIndex]?.trim();

      if (!debitValue && !creditValue) {
        this.missingColumns.push(`Missing Debit or Credit (Row ${rowIndex + 2})`);
      } else if (debitValue && creditValue) {
        this.missingColumns.push(`Invalid Debit/Credit (Row ${rowIndex + 2})`);

      }
      else {
        missingDataColumns.length--;
      }


      if (debitValue && isNaN(parseFloat(debitValue))) {
        this.missingColumns.push(`Invalid Debit (Row ${rowIndex + 2})`);
      }

      if (creditValue && isNaN(parseFloat(creditValue))) {
        this.missingColumns.push(`Invalid Credit (Row ${rowIndex + 2})`);
      }
      if (missingDataColumns.length > 0) {
        this.missingColumns.push(`Missing data in ${missingDataColumns.join(', ')} (Row ${rowIndex + 2})`);
      }



      const dateIndex = this.csvHeaders.indexOf('Date');
      const dateValue = row[dateIndex];
      if (!this.isValidDate(dateValue)) {
        this.missingColumns.push(`Invalid Date (Row ${rowIndex + 2})`);
      }
    }

    return this.missingColumns.length === 0;
  }

  isValidDate(dateValue: string): boolean {
    const dateFormats = [
      'DD/MM/YYYY HH:mm:ss',
      'DD/MM/YY HH:mm'
    ];

    for (const format of dateFormats) {
      if (this.parseDate(dateValue, format)) {
        return true;
      }
    }

    return false;
  }

  parseDate(dateValue: string, format: string): Date | null {
    const momentDate = moment(dateValue, format, true);
    return momentDate.isValid() ? momentDate.toDate() : null;
  }

  isValidRow(row: any[]): boolean {
    const isValidColumns = this.validateRequiredColumns();
    if (!isValidColumns) {
      return false;
    }


    return true;
  }

}
