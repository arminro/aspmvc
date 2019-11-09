import { DeleteSkillComponent } from './components/skill/delete-skill/delete-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { EditJobComponent } from './components/job/edit-job/edit-job.component';
import { AddJobComponent } from './components/job/add-job/add-job.component';
import { AuthenticationGuardService } from './guards/authentication-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyportfolioComponent } from './components/myportfolio/myportfolio.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DeleteJobComponent } from './components/job/delete-job/delete-job.component';


const routes: Routes = [

{
  path: 'me',
  component: MyportfolioComponent, canActivate: [AuthenticationGuardService]
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'logout',
  component: LogoutComponent, canActivate: [AuthenticationGuardService]
},
{
  path: 'register',
  component: RegisterComponent
},

{
  path: 'jobs/add',
  component: AddJobComponent,  canActivate: [AuthenticationGuardService]
},

{
  path: 'jobs/edit',
  component: EditJobComponent,  canActivate: [AuthenticationGuardService]
},

{
  path: 'jobs/delete',
  component: DeleteJobComponent,  canActivate: [AuthenticationGuardService]
},
{
  path: 'skills/add',
  component: AddSkillComponent,  canActivate: [AuthenticationGuardService]
},

{
  path: 'skills/edit',
  component: EditSkillComponent,  canActivate: [AuthenticationGuardService]
},

{
  path: 'skills/delete',
  component: DeleteSkillComponent,  canActivate: [AuthenticationGuardService]
},

{
  path: '',
  redirectTo: '/me',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/me',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
