import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-experiance',
  templateUrl: './experiance.component.html',
  styleUrls: ['./experiance.component.scss'],
  animations: [expandCollapse]
})
export class ExperianceComponent implements OnInit {

  constructor() { }


// ==========================================================
// 		 					          EXPERIANCE 
// ==========================================================
experianceFormIsLoaded = false;
profileRowIsExpanded = false;



toggleProfileRow(){
  this.profileRowIsExpanded = !this.profileRowIsExpanded;
}


toggleExperianceForm(){
   this.experianceFormIsLoaded = !this.experianceFormIsLoaded;
}

  ngOnInit() {
  }

}
