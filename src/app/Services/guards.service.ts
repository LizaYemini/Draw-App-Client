import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RegGuardService implements CanActivate {

  constructor(public login: LoginService, public router: Router) {

  }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (!this.login.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
