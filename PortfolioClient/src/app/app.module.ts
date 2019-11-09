import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/http-interceptor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
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
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DateValueAccessorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent, LogoutComponent],

})
export class AppModule { }
