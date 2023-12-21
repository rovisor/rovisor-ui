import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, } from '@angular/forms';


@Component({
    selector: 'app-registration',
    templateUrl: './registration-v2.component.html',
    styleUrls: ['./registration-v2.component.css']
  })

export class RegistrationV2Component implements OnInit {

public registrationForm!: FormGroup;
constructor(private fb: FormBuilder) { }
minDate = "2022-12-15";
maxDate = "2180-12-15"
ngOnInit(): void {
  this.createForm();
}
createForm() {
  this.registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]]
  });
}
onSubmit(){
  if  (this.registrationForm.valid){
    console.log('Form submitted:', this.registrationForm.value);
  }

}
}