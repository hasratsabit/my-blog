import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class CategoryService {

  domain = this.authService.domain
  options;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

// ==========================================================
// 		                AUTHORIZATIONS
// ==========================================================
  authorizationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

// ==========================================================
// 		                POST CATEGORY
// ==========================================================

  postCategory(category){
    this.authorizationHeaders();
    return this.http.post(this.domain + '/categories/postCategory', category, this.options).map(res => res.json());
  }

// ==========================================================
// 		                GET ALL CATEGORY
// ==========================================================
  getAllCategories() {
  this.authorizationHeaders();
    return this.http.get(this.domain + '/categories/getAllCategories', this.options).map(res => res.json());
  }

// ==========================================================
// 		                GET SINGLE CATEGORY
// ==========================================================
  getSingleCategory(id) {
    this.authorizationHeaders();
    return this.http.get(this.domain + '/categories/getSingleCategory/' + id, this.options).map(res => res.json())
  }

// ==========================================================
// 		                DELETE CATEGORY
// ==========================================================

    deleteCategory(id) {
      this.authorizationHeaders();
      return this.http.delete(this.domain + '/categories/deleteCategory/' + id, this.options).map(res => res.json());
    }



    updateCategory(category) {
      this.authorizationHeaders();
      return this.http.put(this.domain + '/categories/updateCategory', category, this.options).map(res => res.json());
    }
}
