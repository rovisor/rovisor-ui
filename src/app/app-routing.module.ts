import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: '',
  redirectTo: 'auth/sign-in',
  pathMatch: 'full'
},
{
  path: 'login',
  redirectTo: 'auth/sign-in',
  pathMatch: 'full'
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
},
{
  path: 'password-help',
  loadChildren: () => import('./password-help/password-help.module').then(module => module.PasswordHelpModule)
},
{
  path: 'app',
  loadChildren: () => import('./application/application.module').then(module => module.ApplicationModule),
  canLoad: [AuthGuard]
},
{
  path: '**',
  loadChildren: () => import('./not-found/not-found.module').then(module => module.NotFoundModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
