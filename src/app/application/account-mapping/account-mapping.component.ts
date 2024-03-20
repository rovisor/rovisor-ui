import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountMappingService } from './state/account-mapping.service';
import { UploadStatementService } from '../upload-statement/state/upload-statement.service';
@Component({
  selector: 'app-account-mapping-statement',
  templateUrl: './account-mapping.component.html',
  styleUrls: ['./account-mapping.component.css'],
})
export class AccountMappingComponent implements OnInit, OnDestroy {
  private csvDataSubscription: Subscription = new Subscription();
  public dates: string[] = [" "];
  public narrations: string[] = [" "];
  public debitAmounts: string[] = [" "];
  public creditAmounts: string[] = [" "];
  public balances: string[] = [" "];
  public mappingForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private accountMappingService: AccountMappingService,
    private uploadStatementService: UploadStatementService
  ) { }

  ngOnInit() {
   
    this.mappingForm = this.formBuilder.group({
      date: [''],
      narrations: [''],
      debitAmount: [''],
      creditAmount: [''],
      balance: [''],
    });

    // Listen to the event emitted from UploadStatementComponent
    this.csvDataSubscription = this.uploadStatementService.csvDataReady$.subscribe((csvData: any[]) => {
      this.dates = this.extractColumn(csvData, 'Date');
      this.narrations = this.extractColumn(csvData, 'Activity');
      // Update other dropdown options similarly
    });
   
  }

  ngOnDestroy(): void {
    this.csvDataSubscription.unsubscribe();
  }
  extractColumn(csvData: any[], columnName: string): string[] {
    const columnIndex = csvData.length > 0 ? csvData[0].indexOf(columnName) : -1; // Update accordingly
    if (columnIndex !== -1) {
      return csvData.map(row => row[columnIndex]);
    }
    return [];
  }

  onSubmit() {
    
  }
}
