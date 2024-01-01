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
  countries = ARRAY;
  minDate: string = '';
  maxDate: string = new Date().toISOString().split('T')[0];

  user = {
    name: 'VarunTyagi',
    email: "varunx@gmail.com",
    countryCode: "+91",
    phoneNumber: "9856728910",
    password: "8899020010 ",
    birthdate: { year: 2020, month: 12, day: 6 },
    country: "India",
  };

  ngOnInit(): void {
    const minDob = new Date();
    minDob.setFullYear(minDob.getFullYear() - 87);
    this.minDate = minDob.toISOString().split('T')[0];
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^[a-zA-Z-'']+$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|in|ai|io)$/
        ),
      ]),
      countryCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+[1-9]\d{0,2}$/),
      ]),

      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required,]),
      country: new FormControl('', [
        Validators.required,
        this.validateCountryId,
      ]),
    });
    this.userForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      countryCode: this.user.countryCode,
      phoneNumber: this.user.phoneNumber,
      password: this.user.password,
      birthdate: this.user.birthdate,
      country: this.user.country

    });
  }
  
  submitForm(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      const val = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        countryCode: this.userForm.get('countryCode')?.value,
        phoneNumber: this.userForm.get('phoneNumber')?.value,
        password: this.userForm.get('password')?.value,
        birthdate: this.userForm.get('birthdate')?.value,
        country: this.userForm.get('country')?.value,
      };
      console.log(this.user);
    } else {
      console.log('Form is not valid');
    }
  }

  validateCountryId(control: FormControl): { [key: string]: boolean } | null {
    const selectedCountry = control.value;

    if (!selectedCountry || selectedCountry === '') {
      return { invalidCountry: true };
    }

    return null;
  }

  validatedob(control: FormControl): { [key: string]: boolean } | null {
    const maxdob = new Date();
    maxdob.setFullYear(maxdob.getFullYear() - 87);

    const selectedDate = new Date(control.value);

    if (control.value &&(selectedDate > maxdob || isNaN(selectedDate.getTime()))
    ) {
      return { lessthen87: true };
    } else if (control.value && new Date(control.value) > new Date()) {
      return { futureDate: true };
    }
    return null;
  }
}
