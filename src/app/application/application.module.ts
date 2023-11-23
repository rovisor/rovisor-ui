import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [ApplicationComponent],
  imports: [ApplicationRoutingModule,
    HttpClientModule,
    SharedComponentsModule],
})
export class ApplicationModule { }
