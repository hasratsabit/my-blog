import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fadeIn, fadeInDown } from '../../animations/animation';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeIn, fadeInDown]
})
export class LoginComponent implements OnInit {

// ==========================================================
// 		 					VARIABLES
// ==========================================================
  form;
  alertMessage
  alertMessageClass
  successIcon = false;
  proccessing = false;

// ==========================================================
// 		 					     CONSTRUCTOR
// ==========================================================
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {

      this.createLoginForm();
    }

// ==========================================================
// 		 					     CREATE FORM
// ==========================================================
  createLoginForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],// Username Validation
      password: ['', Validators.required]// Password Validation
    })
  }

// ==========================================================
// 		 					     DISABLE AND ENABLE FORM
// ==========================================================
  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

// ==========================================================
// 		 					     LOGIN
// ==========================================================

  onLoginUser() {
    this.proccessing = true; // Is true when proccessing the form.
    this.disableForm(); // Disable the inputs while proccessing.
    // Store the user info in an object.
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    // Making the http request to login using user service.
    this.authService.loginUser(user).subscribe(data => {
      if(!data.success){
        this.proccessing = false;
        this.enableForm();
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
      }else{
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      }
    })
  }

  ngOnInit() {
  }

}
