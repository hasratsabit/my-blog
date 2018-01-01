import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../animations/animation';
import { fadeIn, rainFall} from '../../animations/animation';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  animations: [ expandCollapse, fadeIn, rainFall ]
})
export class ForumComponent implements OnInit {

  isExpanded;
  isAnswering;
  constructor() { }


  toggleForum() {
    this.isExpanded = !this.isExpanded;
  }

  toggleAnswer() {
    this.isAnswering = !this.isAnswering;
  }

  ngOnInit() {
  }

}
