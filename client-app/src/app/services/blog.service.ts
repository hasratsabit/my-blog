import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class BlogService {


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
// 		                CONSTRUCTOR
// ==========================================================
  createAddBlogAuthorization(){
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'authorization': this.authService.authToken // The token contains the user information loaded loadToken method.
      })
    });
  }


// ==========================================================
// 		                POST BLOG
// ==========================================================

  postBlog(blog: any){
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.domain + '/blogs/postBlog', blog, options).map(res => res.json());
  }

// ==========================================================
// 		                GET ALL BLOGS
// ==========================================================

getAllBlogs() {
  return this.http.get(this.domain + '/public/allBlogs').map(res => res.json());
}

getSingBlog(id) {
  return this.http.get(this.domain + '/public/singleBlog/' + id).map(res => res.json())
}

}
