import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { fadeIn, dropDownBox, fadeInDown } from '../../../animations/animation';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  animations: [fadeIn, dropDownBox, fadeInDown]
})
export class DeleteUserComponent implements OnInit {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  deleteUserUrl;
  deleteIsLoaded = true;
  deletedUser; // Contains the user name.
  alertMessage;
  alertMessageClass;
  processing = false;
  successIcon = false;


// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }


  toggleDelete() {
    this.deleteIsLoaded = false;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }


// ==========================================================
// 		                DELETE REQUEST
// ==========================================================

  onDeleteUser() {
    this.userService.deleteUser(this.deleteUserUrl.id).subscribe(data => {
      this.processing = true;
      if(!data.success) {
        this.processing = false;
        this.successIcon = false;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
      }else {
        this.processing = true;
        this.successIcon = true;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        setTimeout(() => {
          this.toggleDelete();
        }, 2000)
      }
    })
  }

// ==========================================================
// 		                CANCEL MODEL AND MESSAGE
// ==========================================================
  cancelDelete() {
    this.toggleDelete();
  }

  closeMessage() {
    this.alertMessage = undefined;
    this.alertMessageClass = undefined;
  }

// ==========================================================
// 		                ONINIT
// ==========================================================
  ngOnInit() {
    // Show model when the page is loaded.
    this.deleteUserUrl = this.activatedRoute.snapshot.params;
    this.userService.getSingleUser(this.deleteUserUrl.id).subscribe(data => {
      this.deletedUser = data.user.name
    })
  }

}
