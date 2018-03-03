import { fadeIn } from './../../../animations/animation';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../../../services/user.service';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  animations: [fadeIn]
})
export class BlogListComponent implements OnInit, OnDestroy {

// ==========================================================
// 		 									VARIABLES
// ==========================================================
  
  blogs;
  username;
  blogId;
  isPublished: Boolean = false;
  postStatusClass;
  subscription: Subscription
  

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private element: ElementRef
  ) { }


  toggleAdd() {
    const addData = { type: 'add'};
    this.blogService.sendBlogDataToSibling(addData);
  }

  toggleEdit(id) {
    const editData = { type: 'edit', id: id };
    this.blogService.sendBlogDataToSibling(editData);
  }

  toggleDelete(id) {
    const deleteData = { type: 'delete', id: id };
    this.blogService.sendBlogDataToSibling(deleteData);
  }



  changeStatus(blogId, event){
    this.blogService.changeBlogStatus(blogId).subscribe(data => {
      if(event.target.innerText === 'Published'){
        this.postStatusClass = 'post-hidden';
      }else {
        this.postStatusClass = 'post-visible';
      }
      this.ngOnInit();
    })
  }

  ngOnInit() {

    // this.blogService.reloadList.subscribe(() => this.ngOnInit());

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
