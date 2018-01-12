import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { BlogService } from './../../../services/blog.service';
import { UserService } from './../../../services/user.service';
import { fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
  animations: [fadeIn]
})
export class AddBlogComponent implements OnInit {

// ==========================================================
// 		 					VARIABLES
// ==========================================================

  FormGroup;
  addBlogFormLoaded = true;
  categories;
  postForm;
  blogAuthor;
  blogImage;

  processing = false;
  alertMessage;
  alertMessageClass;
  successIcon = false;

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

// ==========================================================
// 		 					TOGGLE ADD BLOG
// ==========================================================

  toggleAddBlog() {
    this.addBlogFormLoaded = !this.addBlogFormLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }
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
      // blogImage: ['', Validators.required]
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
// 		 					ENABLE AND DISABLE FORM
// ==========================================================

// Disable Form
disableForm() {
  this.postForm.controls['title'].disable();
  this.postForm.controls['body'].disable();
}

// Enable Form
enableForm() {
  this.postForm.controls['title'].enable();
  this.postForm.controls['body'].enable();
}


// ==========================================================
// 		 					POST BLOG METHOD
// ==========================================================

  onPostBlog(){
    // let files = this.postForm.get('blogImage').files;
    // let formData = new FormData();
    // let file = files[0];
    // this.blogImage = formData.append('blogImage', file, file.name)

    let blog = {
      title: this.postForm.get('title').value,
      body: this.postForm.get('body').value,
      author: this.blogAuthor
    }

    this.blogService.postBlog(blog).subscribe(data => {
      this.processing = true;
      this.disableForm();
      if(!data.success){
        this.processing = false;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.enableForm();
      }else {
        this.processing = true;
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

    // Getting Categories
    this.categoryService.getAllCategories().subscribe(data => {
      if(!data.success) {
        return null
      }else {
        this.categories = data.cat;
      }
    })

    // Getting the blog author
    this.userService.getUserProfile().subscribe(data => {
      if(!data.success){
        return null;
      }else {
        this.blogAuthor = data.user.name;
      }
    })
  }

}
