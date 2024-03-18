import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../state/auth.service';
import { Subscription } from 'rxjs';
import { LoginResponseModel } from '../state/auth.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public loginForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  public showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.subscription.add(this.authService.login(this.loginForm.value).subscribe((response: LoginResponseModel) => {
      if(response.Token) {
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('token', response.Token);
        this.authService.setAuthenticatedUser(true);
        this.router.navigate(['/app/dashboard']);
      } else {
        this.toastr.error("Invalid credentials. Please try again.");
      }
    }));

  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
