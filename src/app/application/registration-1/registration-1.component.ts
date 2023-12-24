import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    });
  }
  submitForm(): void {
    if (this.userForm.valid) {
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

    if (control.value && new Date(control.value) < maxdob) {
      return { lessthen87: true };
    }
    return null;
  }
  validateCountryId(control: FormControl): { [key: string]: boolean } | null {
    if (!Countries[control.value as keyof typeof Countries]) {
      return { invalidCountryId: true };
    }
    return null;
  }
}
//keyof typeof:-to ensure that control.value is used as a valid key for indexing the enum.