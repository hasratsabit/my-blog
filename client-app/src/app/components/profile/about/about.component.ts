import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [expandCollapse]
})
export class AboutComponent implements OnInit {

  constructor() { }


  // ==========================================================
// 		 					          OBJECTIVE
// ==========================================================
aboutFormIsLoaded = false;

toggleaboutForm(){
  this.aboutFormIsLoaded = !this.aboutFormIsLoaded
}

  ngOnInit() {
  }

}
