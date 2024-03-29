import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
    children: [
        {
          path: 'sign-in',
          component: SignInComponent,
        },
        {
          path: 'login',
          component: SignInComponent,
        },
        {
          path: 'sign-up',
          component: SignUpComponent,
        },
        {
          path: 'forgot-password',
          component: ForgotPasswordComponent,
        },
        {
          path: 'reset-password',
          component: ResetPasswordComponent,
        }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
