import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginResponseModel, SignUpResponseModel } from '../state/auth.model';
import { AuthService } from '../state/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public signupForm!: FormGroup;
  public showPassword: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService) { }

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

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.subscription.add(this.authService.signup(this.signupForm.value).subscribe((response: SignUpResponseModel) => {
      if(response) {
        this.toastr.success("Please check your email to verify your account.");
      } else {
        this.toastr.error("Unable to signup, please try later.");
      }
    }));

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


}