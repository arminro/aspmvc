import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Register } from 'src/app/viewmodels/register-model';
import { ComponentBase } from '../component-base';
import { AuthcomponentBase } from '../authcomponent-base';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AuthcomponentBase {

  constructor(public authSrv: AuthService, public router: Router) {
    super(router, authSrv);
  }

  username: string;
  password: string;
  name: string;
  descr: string;


  onSubmit() {
    this.authSrv.register(new Register({name: this.name, username: this.username, description: this.descr, password: this.password}))
    .subscribe(
        data => {
          if (data) {
            this.redirectTo('me');
          }});
  }

}
