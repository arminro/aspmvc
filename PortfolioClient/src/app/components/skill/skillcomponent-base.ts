import { AuthService } from './../../services/auth.service';
import { ComponentBase } from '../component-base';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';

export class SkillcomponentBase extends ComponentBase {
  constructor(public router: Router, public skillSrv: SkillsService, public authSrv: AuthService) {
    super(router);
  }
}
