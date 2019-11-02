import { AccountComponent } from './components/account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MyportfolioComponent } from './components/myportfolio/myportfolio.component';


const routes: Routes = [
{
  path: 'account', component: AccountComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'me',
  component: MyportfolioComponent
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
