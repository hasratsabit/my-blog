import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  domain = 'http://localhost:8080';
  user;
  authToken;

  constructor(
    private http: Http
  ) { }


// ==========================================================
// 		                REGISTER USER
// ==========================================================
  registerUser(user) {
    return this.http.post(this.domain + '/authentication/registerUser', user).map(res => res.json());
  }

// ==========================================================
// 		                   CHECK EMAIL AVAILABILITY
// ==========================================================

  checkEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json())
  }


// ==========================================================
// 		                   CHECK USERNAME AVAILABILITY
// ==========================================================

  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json())
  }

// ==========================================================
// 		            LOGIN
// ==========================================================
  loginUser(user) {
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

// ==========================================================
// 		                STORE USER DATA
// ==========================================================

  // Note: This method stores user data coming from database. The data includes token.
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.authToken = token;
  }


}
