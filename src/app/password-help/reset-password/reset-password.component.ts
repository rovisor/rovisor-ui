import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordHelpService } from '../state/password-help.service';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordRequestModel } from '../state/password-help.model';
import { PasswordValidators } from 'src/app/services/password-validator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPasswordForm!: FormGroup;
  public showPassword: boolean = false;
  public token: string = '';
  public isPasswordConfirmed: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private passwordHelpService: PasswordHelpService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute, private router: Router
  ) {
    this.subscription.add(this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    }));
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: PasswordValidators.MatchValidator
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if(!this.resetPasswordForm.valid) {
      return;
    }
    
    let requestModel: ResetPasswordRequestModel = {
      password: this.resetPasswordForm.value.password,
      confirmPassword: this.resetPasswordForm.value.confirmPassword,
      token: this.token
    }

    this.subscription.add(this.passwordHelpService.resetPassword(requestModel).subscribe((response) => {
      this.toastr.success(response.message);
      this.resetPasswordForm.reset();
      this.router.navigate(['/app/dashboard']);
    }));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
