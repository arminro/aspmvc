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
    private readonly skillSrv: SkillsService) { }

  ngOnInit() {

    this.user = new User({
      username: 'Renikitten',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      name: 'Random Reni',
      id: '1234-1234-1234-1234'
    });
    this.pageTitle = `${this.user.name}\'s Portfolio`;

    this.skills = this.skillSrv.getSkills();
    this.jobs = this.jobSrv.getJobs();
  }

}
