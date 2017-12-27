import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animation';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [ fadeIn]
})
export class CommentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
