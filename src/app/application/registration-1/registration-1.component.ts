import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ARRAY } from './countries-list';
import { Countries } from './countries-list';
@Component({
  selector: 'application-registration-1',
  templateUrl: './registration-1.component.html',
  styleUrls: ['./registration-1.component.css'],
})
export class Registration1Component implements OnInit {
  public userForm!: FormGroup;
  title = 'Angular Reactive Form';
  countries = ARRAY;
  maxDate: string = new Date().toISOString().split('T')[0];
  user = {
    name: "",
  };
  ngOnInit(): void {
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
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+[1-9]\d{9}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required, this.validatedob]),
      country: new FormControl('', [
        Validators.required,
        this.validateCountryId,
      ])
    });
  }
  submitForm(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      const val = {
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        phoneNumber: this.userForm.get('phoneNumber')?.value,
        password: this.userForm.get('password')?.value,
        birthdate: this.userForm.get('birthdate')?.value,
        country: this.userForm.get('country')?.value,
      };

      console.log(val);
    } else {
      console.log('Form is not valid');
    }
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

  validateCountryId(control: FormControl): { [key: string]: boolean } | null {
    if (!Countries[control.value as keyof typeof Countries]) {
      return { invalidCountry: true };
    }
    return null;
  }
}
//keyof typeof:-to ensure that control.value is used as a valid key for indexing the enum.