import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/viewmodels/user-model';
import { Skill } from 'src/app/viewmodels/skill-model';
import { Job } from 'src/app/viewmodels/job-model';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.component.html',
  styleUrls: ['./myportfolio.component.css']
})
export class MyportfolioComponent implements OnInit {
  user: User;
  pageTitle: string;
  skills: Skill[];
  jobs: Job[];

  constructor() { }

  ngOnInit() {

    this.user = new User({
      username: 'Renikitten',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      name: 'Random Reni',
      id: '1234-1234-1234-1234'
    });
    this.pageTitle = `${this.user.name}\'s Portfolio`;



    this.skills = [
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


    this.jobs = [
        new Job({
          employer: 'emp1',
          position: 'pos1',
          startDate: new Date(),
          endDate: new Date(),
          description: 'descr1',
          userId: '12345-1234-12234-1212',
          id: '1234-1234-1234-1234',
        }),
        new Job({
          employer: 'emp2',
          position: 'pos2',
          startDate: new Date(),
          endDate: new Date(),
          description: 'descr2',
          userId: '12345-1234-12234-1212',
          id: '1234-1234-1234-1234',
        }),
        new Job({
          employer: 'emp3',
          position: 'pos3',
          startDate: new Date(),
          endDate: new Date(),
          description: 'descr3',
          userId: '12345-1234-12234-1212',
          id: '1234-1234-1234-1234',
        }),
        new Job({
          employer: 'emp4',
          position: 'pos4',
          startDate: new Date(),
          endDate: new Date(),
          description: 'descr4',
          userId: '12345-1234-12234-1212',
          id: '1234-1234-1234-1234',
        })];
  }

}
