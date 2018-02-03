import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  animations: [expandCollapse]
})
export class PersonalComponent implements OnInit {

  constructor() { }

// ==========================================================
// 		 					    HEADER PROFILE
// ==========================================================
headerFormIsLoaded = false;
profileImageUpload = false;

toggleHeaderForm() {
  this.headerFormIsLoaded = !this.headerFormIsLoaded;
}

toggleProfileUploader() {
  this.profileImageUpload = !this.profileImageUpload;
}


  ngOnInit() {
  }

}
