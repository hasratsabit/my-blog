import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

    onLogout() {
      this.authService.logoutUser();
      this.loggedOutLoaded = true;
      setTimeout(() => {
        this.loggedOutLoaded = false;
        this.router.navigate(['/']);
      }, 3000);
    }

  ngOnInit() {
  }

}
