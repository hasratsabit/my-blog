import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';
import { expandCollapse } from '../../animations/animation';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [expandCollapse]
})
export class ProfileComponent implements OnInit {

  usernameUrl
  personal = {
    name: String,
    username: String,
    email: String
  }

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }







  ngOnInit() {
    this.usernameUrl = this.activatedRoute.snapshot.params
    this.profileService.getUserProfile(this.usernameUrl.username).subscribe(data => {
      this.personal = data.user;
    })
  }

}
