import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'application-registration-1',
  templateUrl: './registration-1.component.html',
  styleUrls: ['./registration-1.component.css']
})
export class Registration1Component implements OnInit { 
  public userForm!: FormGroup;
  title = 'Angular Reactive Form';
ngOnInit(): void {
     this.userForm = new FormGroup({
       name: new FormControl('', [
         Validators.required,
         Validators.minLength(6),
         Validators.maxLength(16),
         Validators.pattern(/^[a-zA-Z0-9]+$/),
       ]),
     });
}
 
  
}

