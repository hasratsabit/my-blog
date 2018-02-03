import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
  animations: [expandCollapse]
})
export class ToolComponent implements OnInit {

  constructor() { }

// ==========================================================
// 		 					          TOOL 
// ==========================================================
toolFormIsLoaded = false;

toggleToolForm(){
  this.toolFormIsLoaded = !this.toolFormIsLoaded;
}

  ngOnInit() {
  }

}
