import { fadeIn } from './../../../animations/animation';
import { CategoryService } from './../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
  animations: [ fadeIn]
})
export class EditBlogComponent implements OnInit {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  FormGroup
  updateForm
  editFormLoaded = true;
  processing = false;
  alertMessage: String;
  alertMessageClass: String;
  successIcon = false;
  updatingBlogUrl;
  categories; // This gets the category list for edit form.
  blogCategory; // This is what user selects when updates the blog.
  blog = {}; // This holds the single blog coming from DB.
  blogId;
  blogAuthor;
  authorUsername;


// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private categorService: CategoryService
  ) { 
    this.createUpdateForm();
  }

// ==========================================================
// 		                TOGGLE EDIT
// ==========================================================
  toggleEditBlog() {
    this.editFormLoaded = !this.editFormLoaded;
    setTimeout(() => {
      this.updatingBlogUrl = null;
      this.location.back();
    }, 500);
  }


// ==========================================================
// 		                CREATE UPDATE FORM
// ==========================================================
  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200),
        this.validTitleChecker
      ])],

      body: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(5000)
      ])],

      category: ['', Validators.compose([
        Validators.required
      ])]
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

// ==========================================================
// 		 				      GET SELECTED CATEGORY
// ==========================================================
  // Get the Category
  onSelect(value) {
    this.blogCategory = value;
  }


// ==========================================================
// 		 				      ENABLE AND DISABLE
// ==========================================================
// Disable Form
disableForm() {
  this.updateForm.controls['title'].disable();
  this.updateForm.controls['body'].disable();
  this.updateForm.controls['category'].disable();
}

// Enable Form
enableForm() {
  this.updateForm.controls['title'].enable();
  this.updateForm.controls['body'].enable();
  this.updateForm.controls['category'].enable();
}




// ==========================================================
// 		 				      	UPDATE BLOG
// ==========================================================

onUpdateBlog(){
  
  this.formData.append('title', this.updateForm.get('title').value);
  this.formData.append('body', this.updateForm.get('body').value);
  this.formData.append('category', this.blogCategory);
  this.formData.append('author', this.blogAuthor);
  this.formData.append('authorUsername', this.authorUsername);
  this.formData.append('_id', this.blogId);

  this.blogService.updateBlog(this.formData).subscribe(data => {

    this.processing = true;
    this.disableForm();

    if(!data.success){
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-red';
      this.successIcon = false;
      this.enableForm();
    }else {
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-green';
      this.successIcon = true;
      setTimeout(() => {
        this.router.navigate(['/blog']);
      }, 2000);
    }
  })

}






  ngOnInit() {
  
// ==========================================================
// 		 					GET SINGL BLOG BY ID
// ==========================================================
    this.updatingBlogUrl = this.activatedRoute.snapshot.params;
    this.blogService.getSingBlog(this.updatingBlogUrl.id).subscribe(data => {
      this.blog = data.blog;
      this.blogId = data.blog._id;
      this.blogAuthor = data.blog.author;
      this.authorUsername = data.blog.authorUsername;
    })

// ==========================================================
// 		 					GET ALL CATEGORIES
// ==========================================================
    this.categorService.getAllCategories().subscribe(data => {
      this.categories = data.cat;
    });
  }

}
