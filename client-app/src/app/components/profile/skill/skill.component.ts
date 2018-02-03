import { Component, OnInit, Output } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [expandCollapse]
})
export class SkillComponent implements OnInit {

  constructor() { }



// ==========================================================
// 		 					          SKILL
// ==========================================================
skillFormIsLoaded = false;

toggleSkillForm(){
  this.skillFormIsLoaded = !this.skillFormIsLoaded;
}


  ngOnInit() {
  }

}
