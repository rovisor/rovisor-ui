import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent  {
  title = 'Angular Reactive Form';

  myForm = new FormGroup({
   user:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[a-zA-Z]+$/)])
   
 })
  formUser()
  {
    console.warn(this.myForm.value)
  }
  get user()
  {
    return this.myForm.get('user')
  }

}
