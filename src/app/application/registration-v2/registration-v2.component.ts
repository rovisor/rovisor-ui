import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-registration',
    templateUrl: './registration-v2.component.html',
    styleUrls: ['./registration-v2.component.css']
  })

export class RegistrationV2Component implements OnInit {
public registrationForm!: FormGroup;
submitted: boolean = false;
constructor() { }
ngOnInit(): void {
  this.registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ,Validators.maxLength(10),Validators.minLength(10)]),

  });
}
}