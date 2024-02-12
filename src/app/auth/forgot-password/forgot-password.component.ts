import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponseModel, SignUpResponseModel } from '../state/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../state/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  public forgotPasswordForm!: FormGroup;

  private subscription: Subscription = new Subscription();
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) {}


  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('',[Validators.required,  Validators.email])
    });
  }
  showToast() {
    this.toastr.success('The email has been sent sueccefully ');
  }
  onSubmit() {
    if (this.forgotPasswordForm!.invalid) {
      return;
    }

    this.subscription.add(this.authService.sendResetPasswordEmail(this.forgotPasswordForm!.value.email).subscribe((response: SignUpResponseModel) => {
      console.log(response);
    }));

  }}
