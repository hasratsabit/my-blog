import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { dialogCloseOpen, fadeInDown, fadeIn, dropDownBox} from '../../animations/animation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [ dialogCloseOpen, fadeInDown, fadeIn, dropDownBox]
})
export class UserComponent implements OnInit {


// ==========================================================
// 		                VARIABLES
// ==========================================================
  users;



// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private userService: UserService,
  ) {
      this.getUsers();
   }



 // ==========================================================
 // 		                GET USERS
 // ==========================================================
  getUsers(){
    this.userService.getUsers().subscribe(data => {
      this.users = data.user;
    })
  }


// ==========================================================
// 		                ONINIT
// ==========================================================
  ngOnInit() {

  }

}
