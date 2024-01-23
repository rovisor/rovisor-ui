import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponseModel } from '../state/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../state/auth.service';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup;

  private subscription: Subscription = new Subscription();
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}


  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('',[Validators.required,  Validators.email])
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
