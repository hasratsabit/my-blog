import { ProjectComponent } from './project/project.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';
import { expandCollapse, fadeIn } from '../../animations/animation';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class ProfileComponent implements OnInit {

  usernameUrl

  accessUsername;
  skills;
  tools;
  projects;
  abouts = {
    about: String
  }
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

  @ViewChild(ProjectComponent) ProjectChild: ProjectComponent;



  onReload(e) {
    this.ngOnInit();
  }







  ngOnInit() {
    this.usernameUrl = this.activatedRoute.snapshot.params
    this.profileService.getUserProfile(this.usernameUrl.username).subscribe(data => {
      this.personal = data.user;
      this.skills = data.user.skill;
      this.tools = data.user.tool;
      this.projects = data.user.project;
      this.abouts = data.user;
    });

    this.userService.getUserProfile().subscribe(data => {
      if(data.success){
        this.accessUsername = data.user.username;
      }else {
        return null;
      }
    })
  }

}