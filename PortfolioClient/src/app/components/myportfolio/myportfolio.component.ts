import { AuthService } from './../../services/auth.service';
import { SkillsService } from './../../services/skills.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/viewmodels/user-model';
import { Skill } from 'src/app/viewmodels/skill-model';
import { Job } from 'src/app/viewmodels/job-model';
import { JobsService } from 'src/app/services/jobs.service';

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

  constructor(
    private readonly jobSrv: JobsService,
    private readonly skillSrv: SkillsService,
    private readonly authSrv: AuthService) { }

  ngOnInit() {

    this.user = this.authSrv.currentUserValue;
    this.pageTitle = `${this.user.name}\'s Portfolio`;
  }

}
