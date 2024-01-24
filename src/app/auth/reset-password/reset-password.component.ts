import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../state/auth.service';
import { LoginResponseModel } from '../state/auth.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onSubmit() {
    if (this.resetPasswordForm!.invalid) {
      return;
    }

    this.subscription.add(this.authService.signup(this.resetPasswordForm!.value).subscribe((response: LoginResponseModel) => {
      console.log(response);
    }));

  }}