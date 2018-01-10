import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService } from './auth.service';
import { ProfileUser } from '../modals/app-user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  domain = this.authService.domain
  options;

// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
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
// 		                GET USERS
// ==========================================================
  getUsers() {
    this.authorizationHeaders();
    return this.http.get(this.domain + '/users/getUsers', this.options).map(res => res.json());
  }

// ==========================================================
// 		                GET SINGLE USER
// ==========================================================

  getSingleUser(id) {
    this.authorizationHeaders();
    return this.http.get(this.domain + '/users/getSingleUser/' + id, this.options).map(res => res.json());
  }

// ==========================================================
// 		                UPDATE USER
// ==========================================================

  updateUser(user){
    this.authorizationHeaders();
    return this.http.put(this.domain + '/users/updateUser', user, this.options).map(res => res.json());
  }

// ==========================================================
// 		                DELETE USER
// ==========================================================

  deleteUser(id){
    this.authorizationHeaders();
    return this.http.delete(this.domain + '/users/deleteUser/' + id, this.options).map(res => res.json());
  }

  getUserProfile(){
    this.authorizationHeaders();
    return this.http.get(this.domain + '/users/getUserProfile', this.options).map(res => res.json());
  }
}
