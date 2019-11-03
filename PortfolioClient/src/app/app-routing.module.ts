import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyportfolioComponent } from './components/myportfolio/myportfolio.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
{
  path: 'account', component: AccountComponent
},

{
  path: 'me',
  component: MyportfolioComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'logout',
  component: LogoutComponent
},
{
  path: 'register',
  component: RegisterComponent
},

{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
