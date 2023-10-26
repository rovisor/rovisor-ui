import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations:[ForgotPasswordComponent, SignInComponent, SignUpComponent],
  imports: [AuthRoutingModule],
  providers: [],
})
export class AuthModule {}
