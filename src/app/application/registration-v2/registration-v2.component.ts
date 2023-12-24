import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ARRAY} from './enum';

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
minDate = "2022-12-15";
maxDate = "2180-12-15"
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
submitForm(): void {
  if (this.registrationForm .valid) {
    const val = {
      name: this.registrationForm .get('name')?.value,
      email: this.registrationForm .get('email')?.value,
      phone: this.registrationForm .get('phoneNumber')?.value,
      password: this.registrationForm .get('password')?.value,
      
    };

    console.log(val);
  } else {
    console.log('Form is not valid');
  }
}
}