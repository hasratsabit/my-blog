import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [expandCollapse]
})
export class ProjectComponent implements OnInit {

  constructor() { }


// ==========================================================
// 		 					          PROJECT 
// ==========================================================
 projectFormIsLoaded = false;

 toggleProjectForm(){
   this.projectFormIsLoaded = !this.projectFormIsLoaded;
 }

 
  ngOnInit() {
  }

}
