import { UserService } from './../../../services/user.service';
import { CommentService } from './../../../services/comment.service';
import { AuthService } from './../../../services/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  currentBlogUrl;

  blog = {};

  // Comment Variables
  FormGroup;
  commentForm;
  processing;
  alertMessage;
  alertMessageClass;
  successIcon;
  postComments;
  authorizedUsername;

// ==========================================================
// 		 									CONSTRUCTOR
// ==========================================================
  constructor(
    public blogService: BlogService, 
    public authService: AuthService,
    private userService: UserService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.createCommentForm();
   }


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


// ==========================================================
// 		 				LIKE BLOG
// ==========================================================
  onLikeBlog(blogId){
    console.log(this.location.path());
    this.blogService.likeBlog(blogId).subscribe(data => {
      if(data.success){
        this.blogLiked = true;
      }
      this.ngOnInit();
    })
  }



// ==========================================================
// 		 				CREATE COMMENT FORM
// ==========================================================

  createCommentForm(){
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(2000)
      ])]
    })
  }


  disableForm(){
    this.commentForm.controls['comment'].disable();
  }

  enableForm(){
    this.commentForm.controls['comment'].enable();
  }


  onPostComment(){

    let comment = {
      comment: this.commentForm.get('comment').value,
      blogId: this.currentBlogUrl
    }
    
    this.disableForm();
    this.processing = true;
  

    this.commentService.postComment(comment).subscribe(data => {
      if(!data.success){
        this.processing = true;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.enableForm();
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.loadAddNewComment();
          this.alertMessageClass = null;
          this.alertMessage = null;
          this.ngOnInit();
        }, 2000);
      }
    })
  }




  askForLogin(){
    if(!this.authService.userLoggedIn()){
      this.processing = true;
      this.disableForm();
      this.loadAddNewComment();
      alert('You must be logged in to comment.');
    }
  }








  ngOnInit() {
    this.currentBlogUrl = this.activatedRoute.snapshot.params.id;
    this.blogService.getSingBlog(this.currentBlogUrl).subscribe(data => {
      this.blog = data.blog;
    });


    this.commentService.getPostComments(this.currentBlogUrl).subscribe(data => {
      this.postComments = data.comments;
    });

    this.userService.getUserProfile().subscribe(data => {
      if(!data.success){
        return null;
      }else {
        this.authorizedUsername = data.user.username;
      }
    })

  }

}
