import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeIn } from '../../../animations/animation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  animations: [ fadeIn ]
})
export class EditUserComponent implements OnInit {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  singleUserUrl;
  alertMessage;
  alertMessageClass;
  editIsLoaded = true;
  processing = false;
  successIcon = false;

  user = {
    name: String,
    email: String,
    username: String,
    userRole: String,
    password: String
  }



// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private userSerivce: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  toggleEdit() {
    this.editIsLoaded = false;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

// ==========================================================
// 		             ERROR SUCCESS TOGGLE
// ==========================================================

  closeMessage() {
    this.alertMessage = undefined;
    this.alertMessageClass = undefined;
  }

// ==========================================================
// 		                UPDATE METHOD
// ==========================================================

  onUpdateUser() {
    this.processing = true;
    // Send update request using the updateUser method in the userSerivce.
    this.userSerivce.updateUser(this.user).subscribe(data => {
    // Check if the request is not made successfully.
      if(!data.success){
        this.processing = false; // Enable the button.
        this.successIcon = false; // Give the warning icon.
        this.alertMessage = data.message; // Give the error message from API.
        this.alertMessageClass = 'alert alert-red'; // Give the red error class to the div.
      }else{
        this.processing = true; // Disable the button
        this.successIcon = true; // Give the thumbs up icon.
        this.alertMessage = data.message; // Give the success message from API.
        this.alertMessageClass = 'alert alert-green'; // Give the green success class to the div.
        setTimeout(() => {
          this.toggleEdit();
        }, 2000);
      }
    })
  }


// ==========================================================
// 		                ONINIT
// ==========================================================
  ngOnInit() {
    this.singleUserUrl = this.activatedRoute.snapshot.params;
    this.userSerivce.getSingleUser(this.singleUserUrl.id).subscribe(data => {
      this.user = data.user;
    })
  }

}
