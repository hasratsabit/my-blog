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
experianceRowIsLoaded = false;



toggleExperianceRow(){
  this.experianceRowIsLoaded = !this.experianceRowIsLoaded;
}


toggleExperianceForm(){
   this.experianceFormIsLoaded = !this.experianceFormIsLoaded;
}

  ngOnInit() {
  }

}
