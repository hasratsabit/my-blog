import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { BlogService } from './../../../services/blog.service';
import { UserService } from './../../../services/user.service';
import { fadeIn, expandCollapse } from '../../../animations/animation';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
  animations: [fadeIn, expandCollapse]
})
export class AddBlogComponent implements OnInit, OnDestroy {

// ==========================================================
// 		 					VARIABLES
// ==========================================================

  FormGroup;
  addBlogFormLoaded = true;
  categories;
  postForm;
  blogImage;
  blogCategory;

  processing = false;
  alertMessage;
  alertMessageClass;
  successIcon = false;

  subscription: Subscription

// ==========================================================
// 		 					CONSTRUCTOR
// ==========================================================

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private blogService: BlogService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.createPostForm();
  }


  @Input('addBlogFormIsLoaded') addBlogFormIsLoaded: Boolean;
  @Output('loadBlog') loadBlog:any = new EventEmitter();

// ==========================================================
// 		 					CREATE ADD BLOG FORM
// ==========================================================
  
  createPostForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        this.validTitleChecker
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(5000)
      ])],
      category: ['', Validators.required],
      image: ['', Validators.maxLength(1)]
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



  loadAddBlog(){
    this.loadBlog.emit();
  }


// ==========================================================
// 		 					ENABLE AND DISABLE FORM
// ==========================================================

// Disable Form
disableForm() {
  this.postForm.controls['title'].disable();
  this.postForm.controls['body'].disable();
  this.postForm.controls['image'].disable();
  this.postForm.controls['category'].disable();
}

// Enable Form
enableForm() {
  this.postForm.controls['title'].enable();
  this.postForm.controls['body'].enable();
  this.postForm.controls['image'].enable();
  this.postForm.controls['category'].enable();
}


// ==========================================================
// 		 					GETTING IMAGE
// ==========================================================


  //Get image
  formData: FormData;
  validImage: Boolean = true;
  imageMessage: String;
  onFileChange(event) {
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
      formData.append('blogImage', file, file.name); // Pass the API expected name, the file itself, and the name of the file.
      this.formData = formData; // Assign the FormData object to the variable. 
    }
  }

  // Get the Category
  onSelect(value) {
    this.blogCategory = value;
  }


// ==========================================================
// 		 									DELETE BLOG
// ==========================================================
  onPostBlog(){

    // Grab all the input and user data and append to the formData. 
    this.formData.append('title', this.postForm.get('title').value);
    this.formData.append('body', this.postForm.get('body').value);
    this.formData.append('category', this.blogCategory);

    // Posting the blog using the postBlog Method in BlogService. 
    this.subscription = this.blogService.postBlog(this.formData).subscribe(data => {
      this.processing = true;
      this.disableForm();
      if(!data.success){
        this.processing = false;
        this.successIcon = false;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.enableForm();
      }else {
        this.processing = true;
        this.successIcon = true;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.postForm.reset();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
    })
  }

  ngOnInit() {

// ==========================================================
// 		 									GET CATEGORIES
// ==========================================================

    // Getting Categories
    this.subscription = this.categoryService.getAllCategories().subscribe(data => {
      if(!data.success) {
        return null
      }else {
        this.categories = data.cat;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
