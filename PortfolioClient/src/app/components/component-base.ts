import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export abstract class ComponentBase {
  constructor(public router: Router) {}

  public redirectTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

}
