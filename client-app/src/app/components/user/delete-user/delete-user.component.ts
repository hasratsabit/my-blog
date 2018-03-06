import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { toggleModal, fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  animations: [toggleModal, fadeIn]
})
export class DeleteUserComponent implements OnInit, OnDestroy {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  public deleteUserIsLoaded: Boolean = false;
  public deleteUserId: String;
  public alertMessage: String;
  public alertMessageClass: String;
  public processing: Boolean = false;
  public successIcon: Boolean = false;

  subscription: Subscription;


// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private userService: UserService
  ) { }


  toggleDeleteUser(){
    this.deleteUserIsLoaded = !this.deleteUserIsLoaded;
  }



// ==========================================================
// 		                DELETE REQUEST
// ==========================================================

  onDeleteUser() {
    this.subscription = this.userService.deleteUser(this.deleteUserId).subscribe(data => {
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
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.processing = false;
          this.toggleDeleteUser();
          this.userService.updateUserTable();
        }, 2000)
      }
    })
  }



// ==========================================================
// 		                ONINIT
// ==========================================================
  ngOnInit() {
   this.subscription = this.userService.userListChannel.subscribe(data => {
     if(data.type === 'delete'){
       this.toggleDeleteUser();
       this.deleteUserId = data.id;
     }
   })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
