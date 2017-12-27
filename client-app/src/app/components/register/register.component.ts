import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fadeIn, fadeInDown, rainFall } from '../../animations/animation';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [ fadeIn, fadeInDown, rainFall]
})
export class RegisterComponent implements OnInit {

// ==========================================================
// 		 					VARIABLES
// ==========================================================
  form;
  proccessing = false;
  alertMessage;
  alertMessageClass;
  successIcon = false;
  availableEmailMessage;
  availableEmailClass;
  emailAvailable = false;
  availableUsernameMessage;
  availableUsernameClass;
  usernameAvailable = false;

// ==========================================================
// 		 					CONSTRUCTOR
// ==========================================================
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {
      this.createRegisterForm();
    }


// ==========================================================
// 		 					CREATE REGISTER FORM
// ==========================================================
  createRegisterForm() {
    this.form = this.formBuilder.group({
      // Name Validation
      name: ['', Validators.compose([
        Validators.required, // Name is required
        Validators.minLength(2), // The minimum character for name is 2
        Validators.maxLength(15), // The maximum character for name is 15
        this.validateName // Regular expression method is called.
      ])],
      // Username Validation
      username: ['', Validators.compose([
        Validators.required, // Username is required
        Validators.minLength(5), // The minimum character for username is 5
        Validators.maxLength(15), // The maximum character for username is 15
        this.validateUsername // Regular expression method is called.
      ])],
      // Email Validation
      email: ['', Validators.compose([
        Validators.required, // Email is required
        Validators.minLength(3), // The minimum character for email is 3
        Validators.maxLength(30), // The maximum character for email is 30
        this.validateEmail // Regular expression method is called.
      ])],
      // Password Validation
      password: ['', Validators.compose([
        Validators.required, // Password is required
        Validators.minLength(5), // The minimum character for password is 5
        Validators.maxLength(35), // The maximum character for password is 35
        this.validatePassword // Regular expression method is called.
      ])],
      // Confirm Password
      confirm: ['', Validators.required] // Field is required.
    }, { validator: this.matchingPasswords('password', 'confirm') });
  }


// ==========================================================
// 		 					     VALIDATION METHODS
// ==========================================================
  // Regular Name Test
  validateName(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression algorithem.
    // Test if the name is a regular name.
    if(regExp.test(controls.value)){
      return null; // If name is passed the test, return null for error.
    }else{
      return {'validateName': true } // If it doesn't pass the test, return the error true.
    }
  }

  // Regular Username Test
  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/); // Regular expression algorithem.
    // Test if the username is a regular username.
    if(regExp.test(controls.value)){
      return null; // If username is passed the test, return null for error.
    }else{
      return {'validateUsername': true } // If it doesn't pass the test, return the error true.
    }
  }


  // Regular Email Test
  validateEmail(controls){
  // Regular expression algorithem.
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test if the email is a regular email.
    if(regExp.test(controls.value)){
      return null; // If email is passed the test, return null for error.
    }else{
      return {'validateEmail': true } // If it doesn't pass the test, return the error true.
    }
  }

  // Regular Password Test
  validatePassword(controls){
  // Regular Password expression algorithem.
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test if the password is a regular password.
    if(regExp.test(controls.value)){
      return null; // If password is passed the test, return null for error.
    }else{
      return {'validatePassword': true } // If it doesn't pass the test, return the error true.
    }
  }


  // Matching Passwords
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if the password and confirm fields match.
      if(group.controls[password].value === group.controls[confirm].value){
        // If matched, return null for error.
        return null;
      }else{
        // Return error true.
        return { 'matchingPasswords': true }
      }
    }
  }

// ==========================================================
// 		 					    ENABLE AND DISABLE FORM
// ==========================================================
  // Enable Form
  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  // Disable Form
  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

// ==========================================================
// 		 					GO BACK AND CLOSE MESSAGE
// ==========================================================
  // Close Notification Message Function
  closeMessage(){
    this.alertMessage = undefined;
    this.alertMessageClass = undefined;
  }

  // Go Back
  goBack(){
    this.location.back();
  }

// ==========================================================
// 		 					CHECK EMAIL AVAILABILITY
// ==========================================================
  checkEmail() {
    const email = this.form.get('email').value;
    this.userService.checkEmail(email).subscribe(data => {
      if(!data.success){
        this.availableEmailMessage = data.message;
        this.availableEmailClass = 'hint-red';
        this.emailAvailable = false;
      }else{
        this.availableEmailMessage = data.message;
        this.availableEmailClass = 'hint-green';
        this.emailAvailable = true;
      }
    })
  }

// ==========================================================
// 		 					CHECK USERNAME AVAILABILITY
// ==========================================================
  checkUsername() {
    // Store the username value in a variable.
    const username = this.form.get('username').value;
    this.userService.checkUsername(username).subscribe(data => {
      if(!data.success){
        this.availableUsernameMessage = data.message;
        this.availableUsernameClass = 'hint-red';
        this.usernameAvailable = false;
      }else{
        this.availableUsernameMessage = data.message;
        this.availableUsernameClass = 'hint-green';
        this.usernameAvailable = true;
      }
    })
  }


// ==========================================================
// 		 					REGISTER USER
// ==========================================================
  onRegisterUser() {
    this.proccessing = false; // Form is proccessing
    this.disableForm(); // Disable all the form while proccessing.
    // Object storing the input values
    const user = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    // Using the http register service to register user.
    this.userService.registerUser(user).subscribe(data => {
      // Check if the API responded with success.
      if(!data.success) {
        this.proccessing = false; // If not success.
        this.successIcon = false; // If not success.
        this.enableForm(); // Enable the form.
        this.alertMessageClass = 'alert alert-red'; // Give the error class.
        this.alertMessage = data.message; // Give the error message from API.
      }else{
        this.alertMessageClass = 'alert alert-green'; // Give the success class.
        this.alertMessage = data.message; // Give the success message from API.
        this.successIcon = true; // If success.
        setTimeout(() => {
          this.router.navigate(['/login']); // Navigate to login after 2 second.
        }, 2000);
      }
    })
  }

  ngOnInit() {

  }

}
