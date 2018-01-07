import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

		canActivate():Observable<boolean> {
			return this.userService.getUserProfile().map(data => {
				return data.adminAccess;
			})
		}
  }
