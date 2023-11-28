import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

 myForm: FormGroup = new FormGroup({}); 

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[a-zA-Z]+$/)]]
    });
  }
 onSubmit(): void {
    // Handle form submission logic here
    console.log('Form submitted!', this.myForm.value);
  }
  // You can add additional methods or handle form submission here
}
