import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Register } from '../viewmodels/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiRoot = 'https://localhost:44375';
  apiUrl = '/api/account';

  constructor(private readonly http: HttpClient) { }s

   static getBearer(): string {
    // tslint:disable-next-line: max-line-length
    return('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjNhNTNjN2EyLTVmYjktNDc2ZC0zMGM0LTA4ZDc1ZGZiZGI1ZSIsIm5iZiI6MTU3MjU2NDQ4OSwiZXhwIjoxNTcyNTkzMjg5LCJpYXQiOjE1NzI1NjQ0ODksImF1ZCI6IjNhNTNjN2EyLTVmYjktNDc2ZC0zMGM0LTA4ZDc1ZGZiZGI1ZSJ9.bqPkheD7A6Rr9X8o_yV3PWte_SYBNcBQtIM5nVJNLnY');
  }


  register(model: Register): Observable<Job> {
    return this.http.post<Job>(this.fullUrl, job, this.httpOptions).pipe(
      catchError(this.handleError<Job>('createJob'))
    );
  }
}
