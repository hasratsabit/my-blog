import { BlogService } from './../../services/blog.service';
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

  blogComments;

  constructor(
    private commentService: CommentService,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      let blogs = data.blogs;
      blogs.map(res => {
        this.blogComments = res.comments;
      });
    });
  }

}
