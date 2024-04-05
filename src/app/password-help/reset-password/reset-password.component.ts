import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponseModel } from '../state/password-help.model';
import { Subscription } from 'rxjs';
import { PasswordHelpService } from '../state/password-help.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {

  public resetPasswordForm!: FormGroup;
  private subscription: Subscription = new Subscription();


  constructor(private formBuilder: FormBuilder, private passwordHelpService: PasswordHelpService, private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, { validator: this.passwordMatchValidator });


  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

  if (passwordControl!.value === confirmPasswordControl!.value) {
    confirmPasswordControl!.setErrors(null);
  } else {
    confirmPasswordControl!.setErrors({ mismatch: true });
  }
}
  
onSubmit() {
  if (this.resetPasswordForm.valid) {
    if (!this.resetPasswordForm.errors?.['mismatch']) {
      this.subscription.add(this.passwordHelpService.resetPassword(this.resetPasswordForm.value).subscribe((response: LoginResponseModel) => {
        console.log(response);
      }));
      this.showToast();
    } else {
      console.log('Passwords did not match');
      
    }
  }
}
  showToast() {
    this.toastr.success('Your password has been changed  sueccefully ');
  }
  
  }