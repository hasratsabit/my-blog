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

  profileRowIsExpanded = false;

  name = '';
  role = ''


  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) { }

// ==========================================================
// 		 					    HEADER PROFILE
// ==========================================================
  headerFormIsLoaded = false;

  toggleHeaderForm() {
    this.headerFormIsLoaded = !this.headerFormIsLoaded;
  }

// ==========================================================
// 		 					          OBJECTIVE
// ==========================================================
  objectiveFormLoaded = false;

  toggleObjectiveForm(){
    this.objectiveFormLoaded = !this.objectiveFormLoaded
  }

// ==========================================================
// 		 					          SKILL
// ==========================================================
  skillFormIsLoaded = false;

  toggleSkillForm(){
    this.skillFormIsLoaded = !this.skillFormIsLoaded;
  }



  toggleProfileRow(){
    this.profileRowIsExpanded = !this.profileRowIsExpanded;
  }


// ==========================================================
// 		 					          TOOL 
// ==========================================================
 toolFormIsLoaded = false;

 toggleToolForm(){
   this.toolFormIsLoaded = !this.toolFormIsLoaded;
 }


// ==========================================================
// 		 					          PROJECT 
// ==========================================================
 projectFormIsLoaded = false;

 toggleProjectForm(){
   this.projectFormIsLoaded = !this.projectFormIsLoaded;
 }


 // ==========================================================
// 		 					          EXPERIANCE 
// ==========================================================
  experianceFormIsLoaded = false;

 toggleExperianceForm(){
    this.experianceFormIsLoaded = !this.experianceFormIsLoaded;
 }

// ==========================================================
// 		 					          EXPERIANCE 
// ==========================================================
  educationFormIsLoaded = false;
  
  toggleEducationForm(){
      this.educationFormIsLoaded = !this.educationFormIsLoaded;
  }
  ngOnInit() {
    this.userService.getUserProfile().subscribe(data => {
      this.name = data.name;
    })
  }

}
