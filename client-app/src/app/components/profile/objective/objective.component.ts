import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
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
