import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name = '';
  role = ''

  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(data => {
      this.name = data.name;
    })
  }

}
