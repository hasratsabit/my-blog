import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
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
