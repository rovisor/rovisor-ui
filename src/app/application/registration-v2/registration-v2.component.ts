import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-registration',
    templateUrl: './registration-v2.component.html',
    styleUrls: ['./registration-v2.component.css']
  })

export class RegistrationV2Component implements OnInit {
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
    
  });
}
}