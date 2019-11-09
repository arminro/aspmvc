import { SkillcomponentBase } from './../skillcomponent-base';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from './../../../viewmodels/skill-model';
import { Component, OnInit } from '@angular/core';
import { JobcomponentBase } from '../../job/jobcomponent-base';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent extends SkillcomponentBase implements OnInit {

  constructor(public router: Router, public skillSrv: SkillsService, public authSrv: AuthService) {
    super(router, skillSrv, authSrv);
  }

  skillToAdd: Skill;
  ngOnInit(): void {
    this.skillToAdd = new Skill();
  }

  onSubmit() {
    this.skillToAdd.userId = this.authSrv.currentUserValue.id;
    this.skillSrv.createSkill(this.skillToAdd)
    .subscribe(
        data => {
            this.redirectTo('me');
          });
  }

  onCancel() {
    this.redirectTo('me');
  }

}
