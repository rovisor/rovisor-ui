import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Registration1Component } from './registration-1/registration-1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadStatementComponent } from './upload-statement/upload-statement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsolidateStatementComponent } from './consolidate-statement/consolidate-statement.component';
import {NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccountMappingComponent } from './account-mapping/account-mapping.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    Registration1Component,
    RegistrationV2Component,
    UploadStatementComponent,
    ConsolidateStatementComponent,
    AccountMappingComponent,
    AddAccountComponent,
    DashboardComponent,
    AccountDetailsComponent
  ],
  imports: [
    NgbDatepickerModule,
    ApplicationRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    NgbModule
  ],
})
export class ApplicationModule { }
