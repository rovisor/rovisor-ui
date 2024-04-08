import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PasswordHelpService } from '../state/password-help.service';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordRequestModel } from '../state/password-help.model';

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
    private activatedRoute: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.confirmPassword) {  
      return;
    }
    
    let requestModel: ResetPasswordRequestModel = {
      password: this.resetPasswordForm.value.password,
      confirmPassword: this.resetPasswordForm.value.confirmPassword,
      token: this.token
    }

    this.passwordHelpService.resetPassword(requestModel).subscribe((response) => {
      this.toastr.success(response.message);
      this.resetPasswordForm.reset();
      this.router.navigate(['/app/dashboard']);
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
