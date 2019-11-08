import { ComponentBase } from './component-base';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class AuthcomponentBase extends ComponentBase {
  constructor(public router: Router, public authSrv: AuthService) {
    super(router);
  }
}
