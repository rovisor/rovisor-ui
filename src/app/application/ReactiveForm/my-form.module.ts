import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyFormComponent } from './my-form.component';

@NgModule({
  declarations: [
     MyFormComponent,
    // your components here
  ],
  imports: [
    ReactiveFormsModule,
    // other modules
  ],
  // other configurations
})
export class YourModule { }
