import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private modals: any[] = [];
  constructor() { }

  ngOnInit() {
  }





}
