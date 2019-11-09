import { Skill } from './../../../viewmodels/skill-model';
import { SkillsService } from 'src/app/services/skills.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { AuthService } from 'src/app/services/auth.service';
import { Job } from 'src/app/viewmodels/job-model';
import { PigeonService } from 'src/app/services/pigeon.service';
import { SkillcomponentBase } from '../skillcomponent-base';

@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent extends SkillcomponentBase implements OnInit {

  constructor(public router: Router, public skillSrv: SkillsService,
              public authSrv: AuthService, private readonly pigeonSrv: PigeonService) {
    super(router, skillSrv, authSrv);
  }

  skillToDelete: Skill;
  ngOnInit(): void {
    this.pigeonSrv.getCurrentData
    .subscribe(jsonData => {
        this.skillToDelete = JSON.parse(jsonData);
    });

  }

  onSubmit() {
    this.skillSrv.deleteSkill(this.skillToDelete)
    .subscribe(
        data => {
            this.redirectTo('me');
          });
  }

  onCancel() {
    this.redirectTo('me');
  }

}
