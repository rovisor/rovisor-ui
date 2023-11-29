import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



import { Registration1Component } from './registration-1/registration-1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ApplicationComponent, Registration1Component],
  imports: [
    ApplicationRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ApplicationModule {}
