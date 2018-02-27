import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AdminGuard } from '../../guard/admin.guard';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fadeIn } from '../../animations/animation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [fadeIn]
})
export class NavigationComponent implements OnInit {

  loggedOutLoaded = false;
  mobileNavExpanded = false;
  isAdmin
  name;
  username;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public adminGuard: AdminGuard,
    private router: Router,
  ) {
    }


  @Output('toggleNavbar') toggleNavbar: any = new EventEmitter();
  @Input('sideNavbarIsToggled') sideNavbarIsToggled: Boolean;

    toggleUserProfile() {
      this.mobileNavExpanded = !this.mobileNavExpanded;
    }



    toggleSideNav() {
      this.toggleNavbar.emit();
    }

    onLogout() {
      this.authService.logoutUser();
      this.loggedOutLoaded = true;
      setTimeout(() => {
        this.loggedOutLoaded = false;
        this.router.navigate(['/']);
      }, 3000);
    }


  ngOnInit() {
    this.userService.getUserProfile().subscribe(data => {
     if(!data.success) {
       return null;
     }else {
       this.username = data.user.username;
      this.name = data.user.name;
     }
   })

  }


}