import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly authSrv: AuthService, private readonly router: Router) { }

  returnUrl: string;

  ngOnInit() {
    this.returnUrl = '/login';
  }

  onSubmit() {
    this.authSrv.logout();
    this.router.navigate([this.returnUrl]);
  }

}
