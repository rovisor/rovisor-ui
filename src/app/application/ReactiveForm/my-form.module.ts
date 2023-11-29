import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyFormComponent } from './my-form.component';

@NgModule({
  declarations: [
     MyFormComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    MyFormComponent,
  ],
 
})
export class YourModule { }
