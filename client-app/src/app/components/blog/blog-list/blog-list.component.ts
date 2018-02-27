import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../../../services/user.service';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {

// ==========================================================
// 		 									VARIABLES
// ==========================================================
  
  blogs;
  username;
  isPublished: Boolean = false;
  postStatusClass;
  subscription: Subscription
  

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private element: ElementRef
  ) { }


  @Output('loadBlog') loadBlog:any = new EventEmitter()


  loadAddBlogForm(){
    this.loadBlog.emit();
  }


  changeStatus(blogId, event){
    this.blogService.changeBlogStatus(blogId).subscribe(data => {
      if(event.target.innerText === 'Published'){
        this.postStatusClass = 'post-hidden';
        console.log(this.postStatusClass);
      }else {
        this.postStatusClass = 'post-visible';
        console.log(this.postStatusClass);
      }
      this.ngOnInit();
    })
  }

  ngOnInit() {

    // ==========================================================
    // 		 									GET ALL BLOGS
    // ==========================================================
    this.subscription = this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs
    })

    // ==========================================================
    // 		 									GET USER PROFILES
    // ==========================================================
    this.subscription = this.userService.getUserProfile().subscribe(data => {
    if(!data.success) {
      return null;
    }else {
      this.username = data.user.username;
    }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
