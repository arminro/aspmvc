import { Skill } from './../viewmodels/skill-model';

import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// based on: https://www.djamware.com/post/5bca67d780aca7466989441f/angular-7-tutorial-building-crud-web-application

@Injectable({
  providedIn: 'root'
})
export class SkillsService {


  apiRoot = 'https://localhost:44375';
  apiUrl = '/api/skills';
  private fullUrl: string;
  // adding header
  // this part only works due to the authetication guard (auth is earlier than any call here)
  getHeaders() {
    return {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',  `Bearer ${this.authSrv.getBearer()}`)
    };
  }

  constructor(private readonly http: HttpClient, private readonly authSrv: AuthService) {
      this.fullUrl = `${this.apiRoot}${this.apiUrl}`;
   }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.fullUrl, this.getHeaders());
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.fullUrl}/${id}`, this.getHeaders());
  }


  createSkill(skill: Skill) {
    return this.http.post<Skill>(this.fullUrl, JSON.stringify(skill), this.getHeaders());
  }

  updateSkill(skill: Skill) {
    return this.http.put(this.fullUrl, skill, this.getHeaders());
  }

  deleteSkill(skill: Skill) {

    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: `Bearer ${this.authSrv.getBearer()}`
      }),
      body: `${JSON.stringify(skill.userId)}`,
    };

    return this.http.delete<Skill>(`${this.fullUrl}/${skill.id}`,  deleteOptions);
  }
}
