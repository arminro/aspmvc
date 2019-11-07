import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Register } from 'src/app/viewmodels/register-model';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private readonly authSrv: AuthService, private readonly router: Router) { }

  username: string;
  password: string;
  name: string;
  descr: string;

  returnUrl: string;

  ngOnInit() {
    this.returnUrl = '/me';
  }

  onSubmit() {
    this.authSrv.register(new Register({name: this.name, username: this.username, description: this.descr, password: this.password}))
    .subscribe(
        data => {
          if (data) {
            this.router.navigate([this.returnUrl]);
          }});
  }

}
