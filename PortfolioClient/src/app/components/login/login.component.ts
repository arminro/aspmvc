import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/viewmodels/login-model';
import { Router } from '@angular/router';
import { ComponentBase } from '../component-base';
import { AuthcomponentBase } from '../authcomponent-base';


@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AuthcomponentBase {

  username: string;
  password: string;
  returnUrl: string;

  // todo: data binding to form elements
  constructor(public authSrv: AuthService, public router: Router) {
    super(router, authSrv);
  }

  onSubmit() {
    this.authSrv.login(new Login({username: this.username, password: this.password}))
    .subscribe(
        data => {
          if (data) {
            this.redirectTo('me');
          }});
  }



}
