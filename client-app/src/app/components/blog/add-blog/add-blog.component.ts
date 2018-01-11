import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { BlogService } from './../../../services/blog.service';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
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
  blogImage

// ==========================================================
// 		 					CONSTRUCTOR
// ==========================================================

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private blogService: BlogService,
    private userService: UserService,
    private formBuilder: FormBuilder
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
      title: ['', Validators.required],
      body: ['', Validators.required],
      blogImage: ['', Validators.required]
    })
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
      if(!data.success){
        console.log(data.message)
      }else {
        console.log(data.message);
      }
    })
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data.cat;
    })

    this.userService.getUserProfile().subscribe(data => {
      this.blogAuthor = data.user.name;
    })

    console.log(this.blogAuthor);
  }

}
