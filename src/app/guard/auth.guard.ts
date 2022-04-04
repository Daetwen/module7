import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  LOGIN_PATH = "/login";
  LOCAL_STORAGE_KEY_USER_ID = "userId";

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY_USER_ID) != null) {
      return true;
    }
    this.router.navigate([this.LOGIN_PATH], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
