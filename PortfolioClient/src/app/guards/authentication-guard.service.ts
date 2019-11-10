import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate  {

  constructor(
    private readonly router: Router,
    private readonly authSrv: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authSrv.currentUserValue;
    if (currentUser && currentUser !== undefined) {
            // authorised so return true
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;

  }


}
