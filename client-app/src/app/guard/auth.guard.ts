import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    router: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
  ) {

    if(this.authService.userLoggedIn()){
      return true;
    }else{
      // Assign the url user is trying to reach in the global variable.
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }

  }
}
