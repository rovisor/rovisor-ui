import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RegistrationV2Component } from './registration-v2/registration-v2.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    RegistrationV2Component
  ],
  imports: [
    ApplicationRoutingModule,
    HttpClientModule,
    SharedComponentsModule
  ],
})
export class ApplicationModule { }
