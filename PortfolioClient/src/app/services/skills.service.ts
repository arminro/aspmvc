import { Skill } from './../viewmodels/skill-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor() { }

  getSkills(): Array<Skill> {

    return [
      new Skill({
        skillName: 'skill1',
        skillDescription: 'descr1',
        userId: '1234-1234-1234-1234',
        id: '4321-4321-4321-4321'
      }),
      new Skill({
        skillName: 'skill2',
        skillDescription: 'descr2',
        userId: '1234-1234-1234-1234',
        id: '4321-4321-4321-4321'
      }),
      new Skill({
        skillName: 'skill3',
        skillDescription: 'descr3',
        userId: '1234-1234-1234-1234',
        id: '4321-4321-4321-4321'
      }),
      new Skill({
        skillName: 'skill4',
        skillDescription: 'descr4',
        userId: '1234-1234-1234-1234',
        id: '4321-4321-4321-4321'
      })];


  }
}
