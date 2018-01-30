import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class CommentService {

// ==========================================================
// 		                VARIABLES
// ==========================================================

domain = this.authService.domain;
options;


// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================

constructor(
  private authService: AuthService,
  private http: Http
) { }


// ==========================================================
// 		                POST COMMENT
// ==========================================================

postComment(id, comment){
  let blogData = {
    id: id,
    comment: comment
  }
  this.authService.loadToken();
  let headers = new Headers({ 
    'authorization': this.authService.authToken
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.domain + '/comments/postComment', blogData, options).map(res => res.json());
}



// ==========================================================
// 		                LIKE COMMENT 
// ==========================================================

  likeComment(commentId, blogId){
    let blogData = {
      commentId: commentId,
      blogId: blogId
    }
    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.domain + '/comments/likeComment', blogData, options).map(res => res.json());
  }


// ==========================================================
// 		                DISLIKE COMMENT
// ==========================================================

  dislikeComment(commentId, blogId){
    let blogData = {
      commentId: commentId,
      blogId: blogId
    }
    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.domain + '/comments/dislikeComment', blogData, options).map(res => res.json());
  }


// ==========================================================
// 		                GET SINGL COMMENT
// ==========================================================

  getSingleComment(blogId, commentId){
    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.domain + '/comments/getSingleComment/' + blogId + '/' + commentId , options).map(res => res.json());
  }

// ==========================================================
// 		                EDIT COMMENT
// ==========================================================

  editComment(blogId, commentId, comment){
    const commentData = {
      blogId: blogId,
      commentId: commentId,
      comment: comment
    }
    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.domain + '/comments/editComment', commentData, options)
          .map(res => res.json());

  }


// ==========================================================
// 		                EDIT COMMENT
// ==========================================================

  deleteComment(blogId, commentId){
    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(this.domain + '/comments/deleteComment/' + blogId + '/' + commentId, options)
          .map(res => res.json());
  }


// ==========================================================
// 		                POST REPLY
// ==========================================================

  postReply(blogId, commentId, replyComment){

    let replyData = {
      blogId: blogId,
      commentId: commentId,
      replyComment: replyComment
    }

    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    
    return this.http.post(this.domain + '/comments/replyComment', replyData, options)
            .map(res => res.json());
  }


// ==========================================================
// 		                DELETE REPLY
// ==========================================================

  deleteRepliedComment(blogId, commentId, replyId){

    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});

    return this.http.delete(this.domain + 
            '/comments/deleteReply/' + blogId + 
            '/' + commentId + '/' + replyId, options)
            .map(res => res.json());
  }

}
