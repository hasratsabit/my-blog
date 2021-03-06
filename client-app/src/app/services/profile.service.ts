import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {

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
// 		                GET USER PROFILE
// ==========================================================

  getUserProfile(username){
    return this.http.get(this.domain + '/public/userProfile/' + username).map(res => res.json());
  }

// ==========================================================
// 		               UPDATE PROFILE
// ==========================================================
  updateProfileBio(username, bio){
    this.authService.loadToken();
    let headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': this.authService.authToken
        });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.domain + '/profile/personal/updateBio/' + username, bio, options)
            .map(res => res.json());
  }


// ==========================================================
// 		                DELETE USER PROFILE
// ==========================================================
  deleteProfile(username) {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});

    return this.http.delete(this.domain + '/profile/personal/deleteProfile/' + username, options)
    .map(res => res.json());

  }

// ==========================================================
// 		                UPDATE USER PROFILE
// ==========================================================

  updateProfileImage(username, image){
    this.authService.loadToken();
    let headers = new Headers({'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.put(this.domain + '/profile/personal/updateProfileImage/' + username, image, options)
      .map(res => res.json());
  }


// ==========================================================
// 		                ADD SKILL
// ==========================================================

  addSkill(username, skill){
    this.authService.loadToken();
    let headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': this.authService.authToken
        });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.domain + '/profile/skills/addSkill/' + username, skill, options)
            .map(res => res.json());
  }


// ==========================================================
// 		                GET SINGLE SKILL
// ==========================================================
  getSingleSkill(username, id){
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.domain + '/profile/skills/getSingleSkill/' + username + '/' + id, options)
            .map(res => res.json());
  }



// ==========================================================
// 		                UPDATE SKILL
// ==========================================================
updateSingleSkill(username, id, updateSkill){
  this.authService.loadToken();
  let headers = new Headers({ 'authorization': this.authService.authToken});
  let options = new RequestOptions({ headers: headers});
  return this.http.put(this.domain + '/profile/skills/updateSkill/' + username + '/' + id, updateSkill, options)
          .map(res => res.json());
}


// ==========================================================
// 		                DELETE SKILL
// ==========================================================
deleteSkill(username, id){
  this.authService.loadToken();
  let headers = new Headers({ 'authorization': this.authService.authToken});
  let options = new RequestOptions({ headers: headers});
  return this.http.delete(this.domain + '/profile/skills/deleteSkill/' + username + '/' + id, options)
          .map(res => res.json());
}


// ==========================================================
// 		                ADD TOOL
// ==========================================================
addTool(username, tool){
  this.authService.loadToken();
  let headers = new Headers({ 'authorization': this.authService.authToken});
  let options = new RequestOptions({ headers: headers});
  return this.http.post(this.domain + '/profile/tools/addTool/' + username, tool, options).map(res => res.json());
}


// ==========================================================
// 		                GET SINGLE TOOL
// ==========================================================
  
  getSingleTool(username, id) {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.domain + '/profile/tools/getSingleTool/' + username + '/' + id, options).map(res => res.json())
  }


// ==========================================================
// 		                UPDATE TOOL
// ==========================================================
  
updateTool(username, id, tool) {
  this.authService.loadToken();
  let headers = new Headers({ 'authorization': this.authService.authToken});
  let options = new RequestOptions({ headers: headers});
  return this.http.put(this.domain + '/profile/tools/updateTool/' + username + '/' + id, tool, options).map(res => res.json())
}


// ==========================================================
// 		                DELETE TOOL
// ==========================================================
  
  deleteTool(username, id) {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(this.domain + '/profile/tools/deleteTool/' + username + '/' + id, options).map(res => res.json())
  }


// ==========================================================
// 		                ADD PROJECT
// ==========================================================

  addProject(username, project) {
    this.authService.loadToken();
    const headers = new Headers({
          'Content-Type': 'application/json',
          'authorization': this.authService.authToken
        });
    const options = new RequestOptions({ headers: headers});
    return this.http.post(this.domain + '/profile/projects/postProject/' + username, project, options)
    .map(res => res.json());

  }

// ==========================================================
// 		                GET SINGLE PROJECT
// ==========================================================

  getSingleProj(username, id) {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.domain + '/profile/projects/singleProject/' + username + '/' + id, options)
    .map(res => res.json());
  }


// ==========================================================
// 		                UPDATE PROJECT
// ==========================================================

  updateProject(username, id, project) {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});

    return this.http.put(this.domain + '/profile/projects/updateProject/' + username + '/' + id, project, options)
    .map(res => res.json());
  }



// ==========================================================
// 		                DELETE PROJECT
// ==========================================================

deleteProject(username, id) {
  this.authService.loadToken();
  let headers = new Headers({ 'authorization': this.authService.authToken});
  let options = new RequestOptions({ headers: headers});

  return this.http.delete(this.domain + '/profile/projects/deleteProject/' + username + '/' + id, options)
  .map(res => res.json());
}




// ==========================================================
// 		                ADD ABOUT
// ==========================================================

  addAbout(username, about) {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});

    return this.http.put(this.domain + '/profile/about/postAbout/' + username, about, options)
           .map(res => res.json());
  }



// ==========================================================
// 		                GET LOGIN USER PROFILE
// ==========================================================
  getLoginUserProfile() {
    this.authService.loadToken();
    let headers = new Headers({ 'authorization': this.authService.authToken});
    let options = new RequestOptions({ headers: headers});
    return this.http.get(this.domain + '/profile/personal/loginUser', options)
    .map(res => res.json());
 
  }

}
