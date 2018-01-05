import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

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
			// If the user is logged in and trying to access routes which are not accessible when logged in, direct to homepage.
      this.router.navigate(['/']);
			return false; // Return false for the attempted route.
    }else{
			// Otherwise allow user to access those routes. 
			return true;
    }

  }
}
