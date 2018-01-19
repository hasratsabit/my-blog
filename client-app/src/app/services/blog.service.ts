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


// ==========================================================
// 		                GET SINGLE BLOG
// ==========================================================
getSingBlog(id) {
  return this.http.get(this.domain + '/public/singleBlog/' + id).map(res => res.json())
}


// ==========================================================
// 		                DELETE BLOG
// ==========================================================

  deleteBlog(id){
    this.createAddBlogAuthorization();
    return this.http.delete(this.domain + '/blogs/deleteBlog/' + id, this.options).map(res => res.json());
  }

// ==========================================================
// 		                UPDATE BLOG
// ==========================================================

  updateBlog(blog){
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.domain + '/blogs/updateBlog', blog, options).map(res => res.json());
  }
}
