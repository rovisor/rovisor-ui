import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundRoutingModule } from './not-found-routing.module';
import {  NotFoundComponent } from './not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    NgbModule
  ]
})
export class NotFoundModule { }
