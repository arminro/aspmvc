import { SkillsService } from 'src/app/services/skills.service';
import { SkillcomponentBase } from './../skillcomponent-base';
import { PigeonService } from './../../../services/pigeon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Skill } from 'src/app/viewmodels/skill-model';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent extends SkillcomponentBase implements OnInit {

  constructor(public router: Router, public skillSrv: SkillsService, public authSrv: AuthService,
              private readonly pigeonSrv: PigeonService) {
      super(router, skillSrv, authSrv);
   }

  currentSkill: Skill;
  ngOnInit() {
    this.pigeonSrv.getCurrentData
    .subscribe(jsonData => {
        this.currentSkill = JSON.parse(jsonData);
    });
  }

  onSubmit() {
    this.skillSrv.updateSkill(this.currentSkill)
    .subscribe(
        data => {
            this.redirectTo('me');
          });
  }

  onCancel() {
    this.redirectTo('me');
  }

}
