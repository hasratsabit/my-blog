import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { expandCollapse, fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class PersonalComponent implements OnInit {

// ==========================================================
// 		 					    VARIABLES
// ==========================================================
headerFormIsLoaded = false;
profileImageUpload = false;
username: String;

FormGroup;
personalForm;
processing = false;

alertMessage;
alertMessageClass;
successIcon = false;

domain = this.authService.domain

constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createPersonalForm();
   }



@Input() personal
@Input() url




// ==========================================================
// 		 					    TOGGLES
// ==========================================================
  toggleHeaderForm() {
    this.headerFormIsLoaded = !this.headerFormIsLoaded;
    // this.personalForm.reset();
  }

  toggleProfileUploader() {
    this.profileImageUpload = !this.profileImageUpload;
  }

// ==========================================================
// 		 					    FORM CREATER
// ==========================================================
  createPersonalForm(){
    this.personalForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.validTitleChecker
      ])],
      location: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.validLocationChecker
      ])],
      twitter: [''],
      linkedin: [''],
      github: [''],
    })
  }


// ==========================================================
// 		 					TITLE VALIDATION
// ==========================================================
 validTitleChecker(controls) {
  // Valid title expression
  const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
  if(regExp.test(controls.value)){
    return null
  }else {
    return { 'validTitleChecker': true }
  }

}


// ==========================================================
// 		 					LOCATION VALIDATION
// ==========================================================
validLocationChecker(controls) {
  // Valid title expression
  const regExp = new RegExp(/^[a-zA-Z0-9-, ]+$/);
  if(regExp.test(controls.value)){
    return null
  }else {
    return { 'validTitleChecker': true }
  }
}

// ==========================================================
// 		 					ENABLE AND DISABLE
// ==========================================================

  disableForm(){
    this.personalForm.controls['title'].disable();
    this.personalForm.controls['location'].disable();
    this.personalForm.controls['twitter'].disable();
    this.personalForm.controls['linkedin'].disable();
    this.personalForm.controls['github'].disable()
  }


  enableForm(){
    this.personalForm.controls['title'].enable();
    this.personalForm.controls['location'].enable();
    this.personalForm.controls['twitter'].enable();
    this.personalForm.controls['linkedin'].enable();
    this.personalForm.controls['github'].enable()
  }


// ==========================================================
// 		 					SUBMITING THE FORM
// ==========================================================
  onPersonalPost(){

    this.processing = true;
    this.disableForm();

    // The Input Values
    const bio = {
      title: this.personalForm.get('title').value,
      location: this.personalForm.get('location').value,
      twitter: this.personalForm.get('twitter').value,
      linkedin: this.personalForm.get('linkedin').value,
      github: this.personalForm.get('github').value,
    }

    this.profileService.updateProfileBio(this.url.username, bio)
    .subscribe(data => {
      if(!data.success){
        this.processing = false;
        this.enableForm();
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.processing = false;
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.enableForm();
          this.toggleHeaderForm();
        }, 2000);
      }
    })
  }



// ==========================================================
// 		 					      PROFILE IMAGE
// ==========================================================

uploadMessage;
uploadMessageClass;
uploadSuccessIcon = false;


    //Get image
    formData: FormData;
    validImage: Boolean = true;
    imageMessage: String;
    onProfileImageChange(event) {
      let fileList: FileList = event.target.files; // Get the Files array from input.
      // Check if there is a file and it matches the type of files that are allowed.
      if(fileList.length > 0 && !fileList[0].name.match(/\.(jpg|jpeg|png)$/)){
        this.imageMessage = 'File type can be only .jpg/.jpeg/.png' // Respond if the type of file is not the type we ask for.
        this.validImage = false; // Keep the form invalid.
        // Check for the size of the file. 
      }else if(event.target.files[0].size > 1200000){
        this.imageMessage = 'The image must not be larger than 1MB.' // Respond if the size of the file is larger than 1MB.
        this.validImage = false; // Keep the form invalid
      }else {
        this.imageMessage = null; // Otherwise no message is displayed
        this.validImage = true; // Validate the form.
        let file: File = fileList[0]; // Take the first file from the array.
        let formData: FormData = new FormData(); // Call the form data constructor.
        formData.append('profileImage', file, file.name); // Pass the API expected name, the file itself, and the name of the file.
        this.formData = formData; // Assign the FormData object to the variable. 
        
      }
    }

// ==========================================================
// 		 					      UPLOAD PROFILE IMAGE
// ==========================================================
    onUploadImage(){
      this.processing = true;
      this.profileService.updateProfileImage(this.url.username, this.formData)
      .subscribe(data => {
        if(!data.success){
          this.processing = false;
          this.uploadMessage = data.message;
          this.uploadMessageClass = 'alert alert-red';
          this.uploadSuccessIcon = false;
        }else {
          this.uploadMessage = data.message;
          this.uploadMessageClass = 'alert alert-green';
          this.uploadSuccessIcon = true;
          setTimeout(() => {
            window.location.reload();
            this.uploadMessage = null;
            this.uploadMessageClass = null;
            this.processing = false;
            this.toggleProfileUploader();
          }, 2000);
        }
      })
    }
  


  ngOnInit() {
  }

}
