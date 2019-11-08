import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ComponentBase } from '../component-base';
import { AuthcomponentBase } from '../authcomponent-base';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent extends AuthcomponentBase {

  constructor(public authSrv: AuthService, public router: Router) {
    super(router, authSrv);
  }


  onSubmit() {
    this.authSrv.logout()
    .subscribe(() => {
      this.redirectTo('login');
    });
  }

}
