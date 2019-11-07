import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../viewmodels/user-model';
import { Login } from '../viewmodels/login-model';

import { Register } from '../viewmodels/register-model';


// based on: https://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
  };
  // easily changed
  // todo: get this from config
  private apiRoot = 'https://localhost:44375';
  private apiUrl = '/api/account';
  private fullUrl: string;

  private currentUserSubject: BehaviorSubject<User>; // this will notify the other services if the user changes
  public currentUser: Observable<User>;

  constructor(private readonly http: HttpClient) {
    this.fullUrl = `${this.apiRoot}${this.apiUrl}`;
    this.currentUserSubject = new BehaviorSubject<User>(null); // default value is null for an authenticated user
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

   public getBearer(): string {
    return this.currentUserValue.token;
  }

  login(candidate: Login) {
    return this.http.post<User>(`${this.fullUrl}/login`, JSON.stringify(candidate), this.httpOptions)
        .pipe(
          tap((resp) => {
            if (resp && resp.token) {
              this.currentUserSubject.next(resp); }
            }));
}

register(candidate: Register) {
  return this.http.post<User>(`${this.fullUrl}/register`, candidate, this.httpOptions)
        .pipe(
          tap((resp) => {
            if (resp && resp.token) {
              this.currentUserSubject.next(resp);
            }}));
}

logout() {
  return this.http.post<any>(`${this.fullUrl}/logout`, null, this.httpOptions);
  this.currentUserSubject.next(null);
}



}
