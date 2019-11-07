import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/viewmodels/login-model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  returnUrl: string;

  // todo: data binding to form elements
  constructor(private readonly authSrv: AuthService, private readonly router: Router) { }

  ngOnInit() {
    this.returnUrl = '/me';
  }

  onSubmit() {
    this.authSrv.login(new Login({username: this.username, password: this.password}))
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        });
  }



}
