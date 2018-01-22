import { AuthService } from './../../../services/auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { expandCollapse, fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class ReadMoreComponent implements OnInit {

// ==========================================================
// 		 									VARIABLES 
// ==========================================================
  allCommentsLoaded = false;
  addNewCommentIsLoaded = false;
  addReplyIsLoaded = false;
  allRepliesLoaded = false;
  blogLiked = false;

  blog = {};

// ==========================================================
// 		 									CONSTRUCTOR
// ==========================================================
  constructor(
    public blogService: BlogService, 
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }


  goBack() {
    this.location.back();
  }


// ==========================================================
// 		 				TOGGLE SECTIONS
// ==========================================================
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


  onLikeBlog(blogId){
    console.log(this.location.path());
    this.blogService.likeBlog(blogId).subscribe(data => {
      if(data.success){
        this.blogLiked = true;
      }
      this.ngOnInit();
    })
  }



  ngOnInit() {
    let currentBlogUrl = this.activatedRoute.snapshot.params.id;
    this.blogService.getSingBlog(currentBlogUrl).subscribe(data => {
      this.blog = data.blog;
    })

  }

}
