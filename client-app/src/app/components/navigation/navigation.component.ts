import { Subscription } from 'rxjs';
import { ProfileService } from './../../services/profile.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
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
export class NavigationComponent implements OnInit, OnDestroy {

  loggedOutLoaded = false;
  mobileNavExpanded = false;
  public isAdmin: Boolean;
  public profileName: String;
  public profileImage: String;
  subsucription: Subscription

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public profileService: ProfileService,
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
    this.subsucription = this.authService.triggerLogin.subscribe(() => this.ngOnInit());
    this.subsucription = this.profileService.getLoginUserProfile().subscribe(data => {
      if(data.success){
        this.profileName = data.profile.name;
        this.profileImage = data.profile.image;
      }else {
        return null;
      }
    })

    this.userService.getUserProfile().subscribe(data => {
      console.log(data.user.adminAccess);
      if(data.success && data.user.adminAccess){
        this.isAdmin = true;
      }else {
        this.isAdmin = false;
      }
    })
  }

  ngOnDestroy() {
    this.subsucription.unsubscribe();
  }


}