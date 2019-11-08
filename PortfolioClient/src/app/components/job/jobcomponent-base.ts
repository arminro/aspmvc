import { AuthService } from './../../services/auth.service';
import { ComponentBase } from '../component-base';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

export class JobcomponentBase extends ComponentBase {
  constructor(public router: Router, public jobSrv: JobsService, public authSrv: AuthService) {
    super(router);
  }
}
