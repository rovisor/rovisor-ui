import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { UploadStatementService } from './state/upload-statement.service';
import { AccountDetail } from '../account-details/state/account-details.model';
import { AccountMappingComponent } from '../account-mapping/account-mapping.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './upload-statement.component.html',
  styleUrls: ['./upload-statement.component.css'],

})
export class UploadStatementComponent implements OnInit {
  openAddAccountModal1() {
    this.modalService.open(AccountMappingComponent, { size: 'lg' });
  }
  @Input() accountInfo!: AccountDetail;
 
  public uploadForm!: FormGroup;
  isButtonsVisible: boolean = false;
  csvData: any[] = [];
  csvHeaders: any[] = [];
  missingColumns: string[] = [];
  invalidRow: any[] = [];

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private uploadStatementService: UploadStatementService, private modalService: NgbModal,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      selectedAccount: [this.accountInfo?.Id] // Add selectedAccount control here
    });
  }


  upload(){
    
    if (this.uploadForm.valid) {
      this.uploadStatementService.uploadStatement(this.uploadForm.value).subscribe( // The subscribe method is used to handle the response from the server.
        response => {
          this.toastr.success('Successfully uploaded the file', 'Success');

        },
        error => {
          this.toastr.error(error.message, 'Error');
        }
      );
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
    for (let i = 1; i < rows.length - 1; i++) {
      const cells = rows[i].split(',');
      this.csvData.push(cells);
    }
    if (this.uploadForm.valid && this.validateRequiredColumns()) {
      this.isButtonsVisible = true;
    } else {
      this.isButtonsVisible = false;
    }

    
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
      let invalidRowIndex = rowIndex;
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
        this.missingColumns.push(`Missing Debit or Credit (Row ${rowIndex + 1})`);
        this.invalidRow.push(invalidRowIndex)
      } else if (debitValue && creditValue) {
        this.missingColumns.push(`Invalid Debit/Credit (Row ${rowIndex + 1})`);
        this.invalidRow.push(invalidRowIndex)

      }
      else {
        missingDataColumns.length--;
      }

      if (debitValue && isNaN(parseFloat(debitValue))) {
        this.missingColumns.push(`Invalid Debit (Row ${rowIndex + 1})`);
        this.invalidRow.push(invalidRowIndex)
      }

      if (creditValue && isNaN(parseFloat(creditValue))) {
        this.missingColumns.push(`Invalid Credit (Row ${rowIndex + 1})`);
        this.invalidRow.push(invalidRowIndex)

      }
      if (missingDataColumns.length > 0) {
        this.missingColumns.push(`Missing data in ${missingDataColumns.join(', ')} (Row ${rowIndex + 1})`);
        this.invalidRow.push(invalidRowIndex)

      }

      const dateIndex = this.csvHeaders.indexOf('Date');
      const dateValue = row[dateIndex];
      if (this.isValidDate(dateValue)) {
        this.missingColumns.push(`Invalid Date (Row ${rowIndex + 1})`);
        this.invalidRow.push(invalidRowIndex)

      }
    }

    return this.invalidRow.length === 0;
  }

  isValidDate(dateValue: string): boolean {
    const dateFormat = 'DD/MM/YYYY'; // Define the required date format
    return this.parseDate(dateValue, dateFormat) !== null;
  }

  parseDate(dateValue: string, format: string): Date | null {
    let date = DateTime.fromFormat(dateValue, format);
    if (date.isValid) {
      // Ensure the date is in the correct format
      const formattedDate = date.toFormat(format);
      if (formattedDate === dateValue) {
        return date.toJSDate();
      }
    }
    return null;
  }
}