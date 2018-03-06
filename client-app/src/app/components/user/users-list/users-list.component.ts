import { Subscription } from 'rxjs/Subscription';
import { fadeIn } from './../../../animations/animation';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  animations: [fadeIn]
})
export class UsersListComponent implements OnInit, OnDestroy {

  users;
  subscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  sendIdToDelete(id) {
    const data = { type: 'delete', id: id };
    this.userService.sendDataToSiblings(data);
  }


  ngOnInit() {
    this.subscription =  this.userService.getUsers().subscribe(data => {
      this.users = data.user;
    })

    this.subscription = this.userService.reloadUserTable.subscribe(() => this.ngOnInit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
