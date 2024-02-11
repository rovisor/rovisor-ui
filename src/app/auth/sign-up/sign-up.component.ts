import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginResponseModel } from '../state/auth.model';
import { AuthService } from '../state/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  title = 'rovisor-ui';
  public signupForm!: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}