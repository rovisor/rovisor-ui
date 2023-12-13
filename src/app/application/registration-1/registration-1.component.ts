import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';

interface CountryInfo {
  id: number;
  name: string;
}
@Component({
  selector: 'application-registration-1',
  templateUrl: './registration-1.component.html',
  styleUrls: ['./registration-1.component.css'],
})
export class Registration1Component implements OnInit {
  public userForm!: FormGroup;
  title = 'Angular Reactive Form';
  countriesInfo: CountryInfo[] = [
    { id: 1, name: 'India' },
    { id: 2, name: 'US' },
    { id: 3, name: 'UK' },
    { id: 4, name: 'Australia' },
    { id: 5, name: 'France' },
  ];
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
      country: new FormControl('', [Validators.required]),
    });
  }
}
