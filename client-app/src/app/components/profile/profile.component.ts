import { SkillComponent } from './skill/skill.component';
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



  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) { }







  ngOnInit() {
   
  }

}
