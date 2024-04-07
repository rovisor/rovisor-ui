import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordHelpService } from '../state/password-help.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public showPassword: boolean = false;
  public token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private passwordHelpService: PasswordHelpService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.passwordHelpService.resetPassword(this.token, this.resetPasswordForm.value.password).subscribe((response: any) => {
        this.showToast();   
      }, error => {
        console.log('Error resetting password:', error);
      });
    }
  }

  showToast() {
    this.toastr.success('Your password has been changed successfully');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
