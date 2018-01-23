import { CommentService } from './../../services/comment.service';
import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animation';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [ fadeIn]
})
export class CommentComponent implements OnInit {

  comments;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.commentService.getAllComments().subscribe(data => {
      this.comments = data.comments;
    })
  }

}
