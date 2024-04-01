import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordHelpRoutingModule } from './password-help-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordHelpComponent } from './password-help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations:[PasswordHelpComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [CommonModule, PasswordHelpRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class PasswordHelpModule {}
