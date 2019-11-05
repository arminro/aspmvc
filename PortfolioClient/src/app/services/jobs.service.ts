import { AuthService } from './auth.service';
import { Job } from './../viewmodels/job-model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

// based on: https://www.djamware.com/post/5bca67d780aca7466989441f/angular-7-tutorial-building-crud-web-application




@Injectable({
  providedIn: 'root'
})
export class JobsService {

  // adding header
 httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization',  `Bearer ${AuthService.getBearer()}`)
};

apiRoot = 'https://localhost:44375';
apiUrl = '/api/jobs';


  private fullUrl: string;

  constructor(private readonly http: HttpClient, private readonly authSrv: AuthService) {
      this.fullUrl = `${this.apiRoot}/${this.apiUrl}`;
   }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.fullUrl, this.httpOptions)
      .pipe(
        tap(heroes => console.log(`fetched jobs from ${this.fullUrl}`)),
        catchError(this.handleError('getJobs', []))
      );
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.fullUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`fetched job with id ${id}`)),
      catchError(this.handleError<Job>(`getProduct id=${id}`))
    );
  }


  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.fullUrl, job, this.httpOptions).pipe(
      catchError(this.handleError<Job>('createJob'))
    );
  }

  updateJob(job: Job): Observable<any> {

    return this.http.put(this.fullUrl, job, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateJob'))
    );
  }

  deleteProduct(job: Job): Observable<Job> {
    return this.http.delete<Job>(this.fullUrl, this.httpOptions).pipe(
      catchError(this.handleError<Job>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
