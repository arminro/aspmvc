import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { MyportfolioComponent } from './components/myportfolio/myportfolio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AddJobComponent } from './components/job/add-job/add-job.component';
import { EditJobComponent } from './components/job/edit-job/edit-job.component';
import { DeleteJobComponent } from './components/job/delete-job/delete-job.component';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { DeleteSkillComponent } from './components/skill/delete-skill/delete-skill.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    MyportfolioComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AddJobComponent,
    EditJobComponent,
    DeleteJobComponent,
    AddSkillComponent,
    EditSkillComponent,
    DeleteSkillComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, LogoutComponent]
})
export class AppModule { }
