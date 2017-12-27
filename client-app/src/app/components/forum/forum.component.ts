import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../animations/animation';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  animations: [ expandCollapse ]
})
export class ForumComponent implements OnInit {

  content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  isExpanded: boolean;

  constructor() { }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
  }

}
