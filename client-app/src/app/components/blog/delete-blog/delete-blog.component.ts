import { Subscription } from 'rxjs';
import { fadeIn } from './../../../animations/animation';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.scss'],
  animations: [fadeIn]
})
export class DeleteBlogComponent implements OnInit, OnDestroy {

// ==========================================================
// 		 									VARIABLES 
// ==========================================================
  deleteBlogIsLoaded = true;
  successIcon = false;
  processing = false;
  alertMessage;
  alertMessageClass;
  currentBlogUrl;

  deletingBlogTitle;

  subscription: Subscription

// ==========================================================
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor(
    private location: Location,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) { }

// ==========================================================
// 		 									DELETE TOGGLE
// ==========================================================
  toggleDelete() {
    this.deleteBlogIsLoaded = !this.deleteBlogIsLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

// ==========================================================
// 		 									DELETE REQUEST
// ==========================================================
  onDeleteBlog(){
    this.processing = true;
    this.subscription = this.blogService.deleteBlog(this.currentBlogUrl).subscribe(data => {
     if(!data.success){
      this.processing = false;
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-red'
      this.successIcon = false;
     }else {
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-green'
      this.successIcon = true;
      setTimeout(() => {
        this.location.back();
      }, 2000);
     }
      
    })
  }


  

  ngOnInit() {
    // Grab the deleting blog url
    this.currentBlogUrl = this.activatedRoute.snapshot.params.id;
    // Find The deleting blog
    this.subscription = this.blogService.getSingBlog(this.currentBlogUrl).subscribe(data => {
      // Store the title to a variable
      this.deletingBlogTitle = data.blog.title;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
