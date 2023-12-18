import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ARRAY } from './countries-list';
@Component({
  selector: 'application-registration-1',
  templateUrl: './registration-1.component.html',
  styleUrls: ['./registration-1.component.css'],
})
export class Registration1Component implements OnInit {
  public userForm!: FormGroup;
  title = 'Angular Reactive Form';
  selectedCountry: any;
  countries = ARRAY;
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]\d{9}$/),
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      password: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }
}
