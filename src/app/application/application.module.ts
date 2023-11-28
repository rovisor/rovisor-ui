import { NgModule } from '@angular/core';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { registration} from'./registration 2/registration 2.component';
import { registration_2} from'./registration_2/registration_2.component';
@NgModule({
  declarations: [
    ApplicationComponent,
    registration
    registration_2 
  ],
  imports: [
    ApplicationRoutingModule,
    HttpClientModule,
    SharedComponentsModule
  ],
})
export class ApplicationModule { }
