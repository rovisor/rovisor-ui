import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { UploadStatementComponent } from '../upload-statement/upload-statement.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, UploadStatementComponent],
  imports: [LayoutRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class LayoutModule {}
