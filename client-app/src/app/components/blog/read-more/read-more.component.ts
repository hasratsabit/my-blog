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
  allCommentsLoaded = true;
  addNewCommentIsLoaded = false;
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
    this.createEditForm();
   }


  goBack() {
    this.location.back();
  }


// ==========================================================
// 		 				TOGGLE SECTIONS
// ==========================================================
  addReplyArray = [];
  allRepliesArray = [];

  loadAllComments() {
    this.allCommentsLoaded = !this.allCommentsLoaded;
  }

  loadAddNewComment() {
    this.addNewCommentIsLoaded = !this.addNewCommentIsLoaded;
  }

  // Load the comment box when a user is replying to a comment
  loadAddReply(id) {
    // Check if the array is empty.
    if(this.addReplyArray.indexOf(id) === -1){
      // If empty, push the id of current comment to the array and toggle the reply box.
      this.addReplyArray.push(id);
    }else {
      // Find the idnex of the id for the current comment in the array.
      let index = this.addReplyArray.indexOf(id);
      this.addReplyArray.splice(index, 1); // Delete the id from the array to close the comment box.
    }
  }

  // Load all the replies.
  loadAllReplies(id) {
    // Check if the array is empty.
    if(this.allRepliesArray.indexOf(id) === -1){
      this.allRepliesArray.push(id); // If empty, Push the current comment id to the array to load all the replies.
    }else {
      // Find the index of current comment in the array.
      let index = this.allRepliesArray.indexOf(id);
      this.allRepliesArray.splice(index, 1); // Delete the current id from the array to collapse the replies.
    }
  }


// ==========================================================
// 		 				LIKE BLOG
// ==========================================================
  onLikeBlog(blogId){
    this.blogService.likeBlog(blogId).subscribe(data => {
      if(data.success){
        this.blogLiked = true;
      }
      this.ngOnInit();
    })
  }



// ==========================================================
// 		 				ADD COMMENT
// ==========================================================

  // Create the comment form.
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

  // Post the comment.
  onPostComment(id){

    let comment = this.commentForm.get('comment').value;
    this.disableForm();
    this.processing = true;
  

    this.commentService.postComment(id, comment).subscribe(data => {
      // If the comment is not posted:
      if(!data.success){
        this.processing = true;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.enableForm();
        // If the comment is posted:
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.commentForm.reset();
          this.enableForm();
          this.processing = false;
          this.alertMessageClass = null;
          this.alertMessage = null;
          this.ngOnInit();
        }, 2000);
      }
    })
  }



// ==========================================================
// 		 				          ASK FOR LOGIN
// ==========================================================
  askForLogin(){
    if(!this.authService.userLoggedIn()){
      this.processing = true;
      this.disableForm();
      this.loadAddNewComment();
      alert('You must be logged in to comment.');
    }
  }





// ==========================================================
// 		 				          LIKE AND DISLIKE
// ==========================================================

  // Like comment
  likeComment(commentId){
    this.commentService.likeComment(commentId, this.currentBlogUrl)
    .subscribe(data => {
      this.ngOnInit();
    })
  }

  // Dislike Comment
  dislikeComment(commentId){
    this.commentService.dislikeComment(commentId, this.currentBlogUrl)
    .subscribe(data => {
      this.ngOnInit()
    })
  }



// ==========================================================
// 		                EDIT COMMENT
// ==========================================================
  editCommentForm;
  editArray = [];
  commentId;
  // This holds the value of edited comment.
  oneComment = {}

  // Create the edit form.
  createEditForm(){
    this.editCommentForm = this.formBuilder.group({
      editComment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(2000)
      ])]
    })
  }

  // Toggle the edit form
  toggleEditComment(id){
      // Check if the array is empty.
    if(this.editArray.indexOf(id) === -1){
      this.editArray.push(id); // Push the current comment id to the array to open the edit box.
      this.commentId = id; // Asign the id of current comment to the commentId var.
      this.getSingleComment(this.currentBlogUrl, this.commentId); // Call the Get Single Comment Method for edit and pass the two ids
    }else {
      // Closing the edit box
      let index = this.editArray.indexOf(id); // Find the index of current comment id in the array.
      this.editArray.splice(index, 1); // Delete the id of current comment to close the edit box.
    }
  }

  // Get Single Comment 
  getSingleComment(blogId, commentId){
    this.commentService.getSingleComment(blogId, commentId)
    .subscribe(data => {
      this.oneComment = data.singleComment[0].comment;
    });
  }

  // Edit the comment
  onEditComment(){
    // Get the value of the editting comment.
    let comment = this.editCommentForm.get('editComment').value
    
    // Call the edit comment method.
    this.commentService.editComment(this.currentBlogUrl, this.commentId, comment)
    .subscribe(data => {
      // If the comment is successfully editted:
      if(data.success){
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        this.processing = true;
        setTimeout(() => {
          this.ngOnInit();
          this.processing = false;
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.editCommentForm.reset();
          this.editArray.splice(this.editArray.indexOf(this.commentId, 1));
        }, 2000);
        // If comment is not editted:
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.processing = false;
      }
    });
  }


// ==========================================================
// 		                DELETE COMMENT
// ==========================================================



  ngOnInit() {

// ==========================================================
// 		                GET CURRENT BLOG
// ==========================================================
    this.currentBlogUrl = this.activatedRoute.snapshot.params.id;
    this.blogService.getSingBlog(this.currentBlogUrl).subscribe(data => {
      this.blog = data.blog;
    });

// ==========================================================
// 		                GET USER PROFILE
// ==========================================================
    this.userService.getUserProfile().subscribe(data => {
      if(!data.success){
        return null;
      }else {
        this.authorizedUsername = data.user.username;
      }
    });



  }

}
