import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Enum } from './enum';

@Component({
    selector: 'app-registration',
    templateUrl: './registration-v2.component.html',
    styleUrls: ['./registration-v2.component.css']
  })

export class RegistrationV2Component implements OnInit {
public registrationForm!: FormGroup;
ngOnInit(): void {
  this.registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(16)])
  });
  console.warn(Enum.India);
}
}