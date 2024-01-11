import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ARRAY} from './enum';
import { log } from 'console';

@Component({
    selector: 'app-registration',
    templateUrl: './registration-v2.component.html',
    styleUrls: ['./registration-v2.component.css']
  })

export class RegistrationV2Component implements OnInit {
selectedCountry: any;
  countries= ARRAY;
onDateSelect() {
throw new Error('Method not implemented.');
}
public registrationForm!: FormGroup;
constructor() { }

ngOnInit(): void {
  this.registrationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    phone: new FormControl('', [Validators.required, 
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ,
      Validators.maxLength(10),
      Validators.minLength(10)
    ]),
    email: new FormControl('',[
      Validators.required,
    ]),
    password: new FormControl('',[
      Validators.required,
    ]),
    calendar: new FormControl('',[
      Validators.required,
    ]),
    country: new FormControl('',[
      Validators.required,
    ]),
    
  });
}
submit(): void {
  if (this.registrationForm.valid) {
    const val = {
      name: this.registrationForm.get('name')?.value,
      email: this.registrationForm.get('email')?.value,
      phoneNumber: this.registrationForm.get('phoneNumber')?.value,
      password: this.registrationForm.get('password')?.value,
      birthdate: this.registrationForm.get('birthdate')?.value,
      country: this.registrationForm.get('country')?.value,
    };

    console.log(val);
  } else {
    log('Form is not valid');
  }
}
}