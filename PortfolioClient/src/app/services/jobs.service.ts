import { AuthService } from './auth.service';
import { Job } from './../viewmodels/job-model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// based on: https://www.djamware.com/post/5bca67d780aca7466989441f/angular-7-tutorial-building-crud-web-application

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  apiRoot = 'https://localhost:44375';
  apiUrl = '/api/jobs';
  private fullUrl: string;

  getHeaders() {
    return {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',  `Bearer ${this.authSrv.getBearer()}`)
    };
  }
  // adding header
  // this part only works due to the authetication guard (auth is earlier than any call here)

  constructor(private readonly http: HttpClient, private readonly authSrv: AuthService) {
      this.fullUrl = `${this.apiRoot}${this.apiUrl}`;
   }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.fullUrl, this.getHeaders());
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.fullUrl}/${id}`, this.getHeaders());
  }


  createJob(job: Job) {
    return this.http.post<Job>(this.fullUrl, JSON.stringify(job), this.getHeaders());
  }

  updateJob(job: Job) {
    return this.http.put(this.fullUrl, job, this.getHeaders());
  }

  deleteJob(job: Job) {

    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: `Bearer ${this.authSrv.getBearer()}`
      }),
      body: `\"${job.userId.toString()}\"`,
    };
    return this.http.delete<Job>(`${this.fullUrl}/${job.id}`,  deleteOptions);
  }


}
