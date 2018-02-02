import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  constructor() { }

// ==========================================================
// 		 					    HEADER PROFILE
// ==========================================================
headerFormIsLoaded = false;

toggleHeaderForm() {
  this.headerFormIsLoaded = !this.headerFormIsLoaded;
}


  ngOnInit() {
  }

}
