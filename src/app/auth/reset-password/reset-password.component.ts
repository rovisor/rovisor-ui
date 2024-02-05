import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponseModel } from '../state/auth.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../state/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  showToast() {
    this.toastr.success('Your password has been changed  sueccefully ');
  }
  
  }