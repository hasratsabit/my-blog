import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from './../../../services/profile.service';
import { UserService } from './../../../services/user.service';
import { CommentService } from './../../../services/comment.service';
import { AuthService } from './../../../services/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { expandCollapse, fadeIn, toggleModal } from '../../../animations/animation';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  animations: [expandCollapse, fadeIn, toggleModal]
})
export class ReadMoreComponent implements OnInit, OnDestroy {

// ==========================================================
// 		 									VARIABLES 
// ==========================================================
  allCommentsLoaded = true;
  addNewCommentIsLoaded = false;
  allRepliesLoaded = false;
  blogLiked = false;
  currentBlogUrl;
  subscription: Subscription;

  blog = {
    authorName: String,
    comments: [{
      authorUsername: String,
      replies: []
    }]
  };

  // Comment Variables
  FormGroup;
  commentForm;
  processing;
  alertMessage;
  alertMessageClass;
  successIcon;
  postComments;
  commentsLength
  authorizedUsername;

// ==========================================================
// 		 									CONSTRUCTOR
// ==========================================================
  constructor(
    public blogService: BlogService, 
    public authService: AuthService,
    private userService: UserService,
    private profileService: ProfileService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.createCommentForm();
    this.createEditForm();
    this.createReplyForm();
   }


  goBack() {
    this.location.back();
  }


  public userIsNotLoggedIn: Boolean = false;
  toogleUserLogin() {
    this.userIsNotLoggedIn = !this.userIsNotLoggedIn;
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


// ==========================================================
// 		 				LIKE BLOG
// ==========================================================
  onLikeBlog(blogId){
    this.subscription = this.blogService.likeBlog(blogId).subscribe(data => {
      if(!this.authService.userLoggedIn()){
        this.toogleUserLogin();
      }else if(data.success){
        this.blogLiked = true;
        this.ngOnInit();
      }
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
  

    this.subscription = this.commentService.postComment(id, comment).subscribe(data => {
      // If the comment is not posted:
      if(!this.authService.userLoggedIn()){
        this.toogleUserLogin();
      }else if(!data.success){
        this.processing = false;
        this.enableForm();
        // If the comment is posted:
      }else {
        this.commentForm.reset();
        this.enableForm();
        this.loadAddNewComment();
        this.ngOnInit();
        setTimeout(() => {
          this.processing = false;
        }, 2000)
      }
    });
  }



// ==========================================================
// 		 				          ASK FOR LOGIN
// ==========================================================





// ==========================================================
// 		 				          LIKE AND DISLIKE
// ==========================================================

  // Like comment
  likeComment(commentId){
   this.subscription =  this.commentService.likeComment(commentId, this.currentBlogUrl)
    .subscribe(data => {
      if(!this.authService.userLoggedIn()){
        this.toogleUserLogin()
      }else {
        this.ngOnInit();
      }
    })
  }

  // Dislike Comment
  dislikeComment(commentId){
    this.subscription = this.commentService.dislikeComment(commentId, this.currentBlogUrl)
    .subscribe(data => {
      if(!this.authService.userLoggedIn()){
        this.toogleUserLogin()
      }else {
        this.ngOnInit();
      }
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


  // Edit the comment
  onEditComment(){
    // Get the value of the editting comment.
    let comment = this.editCommentForm.get('editComment').value
    this.processing = true;
    
    // Call the edit comment method.
   this.subscription = this.commentService.editComment(this.currentBlogUrl, this.commentId, comment)
    .subscribe(data => {
      // If the comment is successfully editted:
      if(!data.success){
        this.processing = false;
      }else {
        this.editCommentForm.reset();
        this.editArray.splice(this.editArray.indexOf(this.commentId, 1));
        this.ngOnInit();
        setTimeout(() => {
          this.processing = false;
        }, 2000)
      }
    });
  }


// ==========================================================
// 		                DELETE COMMENT
// ==========================================================
  
  deleteArray = [];
  deleteId;

  toggleDeleteComment(id){
    // Check if the delete array is empty.
    if(this.deleteArray.indexOf(id) === -1){
      this.deleteArray.push(id); // If empty, Push the current comment id to the array to open the delete box.
      this.deleteId = id; // Assign the current comment id to the deleteId var.
    }else {
      // Find the index of current comment id in the array.
      let index = this.deleteArray.indexOf(id);
      this.deleteArray.splice(index, 1); // Delete the id from the array to close the delete box.
    }
  }

  onDeleteComment(){
    this.processing = true;

    this.subscription = this.commentService.deleteComment(this.currentBlogUrl, this.deleteId)
    .subscribe(data => {
      if(!data.success){
        this.processing = false;
      }else {
        this.deleteArray.splice(this.deleteArray.indexOf(this.commentId));
        this.ngOnInit();
        setTimeout(() => {
          this.processing = false;
        }, 2000)
      }
    })
  }


// ==========================================================
// 		 				          REPLY COMMENTS
// ==========================================================

replyForm 

addReplyArray = [];
allRepliesArray = [];
replyId

createReplyForm(){
  this.replyForm = this.formBuilder.group({
    replyComment: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(2000)
    ])]
  })
}
  // Load the comment box when a user is replying to a comment
  loadAddReply(id) {
    // Check if the array is empty.
    if(this.addReplyArray.indexOf(id) === -1){
      // If empty, push the id of current comment to the array and toggle the reply box.
      this.addReplyArray.push(id);
      this.allRepliesArray.push(id); // Also load the replies when user wants to add reply.
      this.replyId = id;
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

  onPostReply(){

    this.processing = true;

    let replyComment = this.replyForm.get('replyComment').value;
    this.subscription = this.commentService.postReply(this.currentBlogUrl, this.replyId, replyComment)
      .subscribe(data => {
        if(!this.authService.userLoggedIn()){
          this.toogleUserLogin()
        }else if(!data.success){
          this.processing = false;
        }else {
          this.replyForm.reset();
          this.addReplyArray.splice(this.addReplyArray.indexOf(this.replyId));
          this.ngOnInit();
          setTimeout(() => {
            this.processing = false;
          }, 2000)
        }
      });
  }








// ==========================================================
// 		 				          DELETE REPLY
// ==========================================================

  deleteReplyArray = [];
  deleteReplyId;
  parentCommentId;

  toggleDeleteReply(childId, parentId) {
    if(this.deleteReplyArray.indexOf(childId) === -1){
      this.deleteReplyArray.push(childId);
      this.deleteReplyId = childId;
      this.parentCommentId = parentId;
    }else {
      let index = this.deleteReplyArray.indexOf(childId);
      this.deleteReplyArray.splice(index, 1);
    }
  }


  onDeleteReply(){

    this.subscription = this.commentService.deleteRepliedComment(
      this.currentBlogUrl, 
      this.parentCommentId, 
      this.deleteReplyId)
      .subscribe(data => {
        if(data.success){
          this.deleteReplyArray.splice(this.deleteReplyArray.indexOf(this.deleteReplyId));
          this.ngOnInit();
        }
      });
  }



// ==========================================================
// 		                GET SINGLE COMMENT
// ==========================================================

 getSingleComment(blogId, commentId){
  this.subscription = this.commentService.getSingleComment(blogId, commentId)
  .subscribe(data => {
    this.oneComment = data.singleComment[0].comment;
  });
}


  // The method is called bellow which takes the username arrays as param.
  getProfile(usernames) {
    // Loops through usernames and send gets the profile for each username.
    usernames.forEach((username, index) => {
     this.profileService.getUserProfile(username).subscribe(data => {
       // Loops through comments and check if the username of the commentator is the same as us
      this.blog.comments.forEach(comment => {
        // Assign the image property to the object.
        if(username === comment.authorUsername) {
          Object.assign(comment, {
            image: data.user.image
          })
        }

        // Loop through replies and assign the image property to the reply object.

        comment.replies.forEach(reply => {
          if(username === reply.authorUsername) {
            Object.assign(reply, {
              image: data.user.image
            })
          }
        })
      })
     })
    })
  }




// ==========================================================
// 		                TOGGLE SHARE
// ==========================================================
public shareUrlIsLoaded: Boolean = false;
public url: String;

  toggleShareUrl() {
    this.url = window.location.href;
    this.shareUrlIsLoaded = !this.shareUrlIsLoaded;
  }


// ==========================================================
// 		                UPDATE SHARE 
// ==========================================================
  changeShareCounter(id){
    this.subscription = this.blogService.updateBlogShared(id).subscribe()
  }

  usernames
  ngOnInit() {

// ==========================================================
// 		                GET CURRENT BLOG
// ==========================================================
    this.currentBlogUrl = this.activatedRoute.snapshot.params.id;
   this.subscription =  this.blogService.getSingBlog(this.currentBlogUrl).subscribe(data => {
      this.blog = data.blog;
      this.commentsLength = data.blog.comments.length
      this.usernames = data.blog.comments.map(com => com.authorUsername);
      this.getProfile(this.usernames);
    });

// ==========================================================
// 		                GET USER PROFILE
// ==========================================================
    this.subscription = this.userService.getUserProfile().subscribe(data => {
      if(!data.success){
        return null;
      }else {
        this.authorizedUsername = data.user.username;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
