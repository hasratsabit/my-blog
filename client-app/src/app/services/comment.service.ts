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

constructor(
  private authService: AuthService,
  private http: Http
) { }


postComment(comment){
  this.authService.loadToken();
  let headers = new Headers({ 
    'authorization': this.authService.authToken
  });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.domain + '/comments/postComment', comment, options).map(res => res.json());
}


// ==========================================================
// 		                GET ALL COMMENTS
// ==========================================================
  getAllComments() {
    this.authService.loadToken();
    let headers = new Headers({ 
      'authorization': this.authService.authToken
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.domain + '/comments/allComments', options).map(res => res.json());
  }



// ==========================================================
// 		                GET COMMENTS FOR EACH POST
// ==========================================================
getPostComments(id){
  return this.http.get(this.domain + '/public/getCommentByPost/' + id).map(res => res.json());
}


}
