import { PigeonService } from './../../services/pigeon.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { SkillsService } from './../../services/skills.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/viewmodels/user-model';
import { Skill } from 'src/app/viewmodels/skill-model';
import { Job } from 'src/app/viewmodels/job-model';
import { JobsService } from 'src/app/services/jobs.service';
import { ComponentBase } from '../component-base';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.component.html',
  styleUrls: ['./myportfolio.component.css']
})
export class MyportfolioComponent extends ComponentBase implements OnInit {
  user: User;
  pageTitle: string;
  skills: Skill[];
  jobs: Job[];

  constructor(
    private readonly jobSrv: JobsService,
    private readonly skillSrv: SkillsService,
    public authSrv: AuthService,
    public router: Router,
    private readonly pigeonSrv: PigeonService) {
        super(router);
     }

  ngOnInit() {

    this.user = this.authSrv.currentUserValue;
    this.pageTitle = `${this.user.name}\'s Portfolio`;
    this.jobSrv.getJobs()
    .subscribe(
        (data: Job[]) => {
          if (data) {
            this.jobs = data;
          }});

    this.skillSrv.getSkills()
          .subscribe(
              (data: Skill[]) => {
                if (data) {
                  this.skills = data;
                }});
  }



  addJobClick() {
    this.redirectTo('jobs/add');
  }

  editJobClick(currentJob: Job) {
    this.pigeonSrv.sendData(JSON.stringify(currentJob));
    this.redirectTo('jobs/edit');
  }
  deleteJobClick(currentJob: Job) {
    this.pigeonSrv.sendData(JSON.stringify(currentJob));
    this.redirectTo('jobs/delete');
  }

  addSkillClick() {
    this.redirectTo('skills/add');
  }

  editSkillClick(currentSkill: Skill) {
    this.pigeonSrv.sendData(JSON.stringify(currentSkill));
    this.redirectTo('skills/edit');
  }
  deleteSkillClick(currentSkill: Skill) {
    this.pigeonSrv.sendData(JSON.stringify(currentSkill));
    this.redirectTo('skills/delete');
  }

}
