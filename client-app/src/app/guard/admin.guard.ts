import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

	userData;

	constructor(
		private userService: UserService,
		private router: Router
	) {}

		// The method returns true or false based on if user have admin access or not.
		canActivate() {
			return this.userService.getUserProfile().map(data => data.user.adminAccess);
		}
  }
