import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  animations: [expandCollapse]
})
export class ObjectiveComponent implements OnInit {

  constructor() { }



// ==========================================================
// 		 					          OBJECTIVE
// ==========================================================
objectiveFormLoaded = false;

toggleObjectiveForm(){
  this.objectiveFormLoaded = !this.objectiveFormLoaded
}


  ngOnInit() {
  }

}
