import { Skill } from './../viewmodels/skill-model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

   // adding header
  // this part only works due to the authetication guard (auth is earlier than any call here)
 httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization',  `Bearer ${this.authSrv.getBearer()}`)
};

apiRoot = 'https://localhost:44375';
apiUrl = '/api/skills';


  private fullUrl: string;

  constructor(private readonly http: HttpClient, private readonly authSrv: AuthService) {
      this.fullUrl = `${this.apiRoot}/${this.apiUrl}`;
   }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.fullUrl, this.httpOptions);
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.fullUrl}/${id}`, this.httpOptions);
  }


  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.fullUrl, Skill, this.httpOptions);
  }

  updateSkill(skill: Skill): Observable<any> {
    return this.http.put(this.fullUrl, Skill, this.httpOptions);
  }

  deleteProduct(skill: Skill): Observable<Skill> {
    return this.http.delete<Skill>(this.fullUrl, this.httpOptions);
  }
}
