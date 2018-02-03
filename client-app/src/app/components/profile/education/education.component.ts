import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  animations: [expandCollapse]
})
export class EducationComponent implements OnInit {

  constructor() { }


// ==========================================================
// 		 					          EXPERIANCE 
// ==========================================================
educationFormIsLoaded = false;
  
toggleEducationForm(){
    this.educationFormIsLoaded = !this.educationFormIsLoaded;
}

  ngOnInit() {
  }

}
