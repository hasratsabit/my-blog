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

}
