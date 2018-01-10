import { Component, OnInit } from '@angular/core';
import { expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  animations: [expandCollapse]
})
export class ReadMoreComponent implements OnInit {

  allCommentsLoaded = false;
  addNewCommentIsLoaded = false;
  addReplyIsLoaded = false;
  allRepliesLoaded = false;

  constructor() { }

  loadAllComments() {
    this.allCommentsLoaded = !this.allCommentsLoaded;
  }

  loadAddNewComment() {
    this.addNewCommentIsLoaded = !this.addNewCommentIsLoaded;
  }

  loadAddReply() {
    this.addReplyIsLoaded = !this.addReplyIsLoaded;
  }

  loadAllReplies() {
    this.allRepliesLoaded = !this.allRepliesLoaded;
  }

  ngOnInit() {
  }

}
