import { Subscription } from 'rxjs/Subscription';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
  isPublished: Boolean = false;
  postStatusClass;
  subscription: Subscription
  

  constructor(
    private blogService: BlogService
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
    this.subscription = this.blogService.changeBlogStatus(blogId).subscribe(data => {
      if(event.target.innerText === 'Published'){
        this.postStatusClass = 'post-hidden';
      }else {
        this.postStatusClass = 'post-visible';
      }
      this.ngOnInit();
    })
  }

  ngOnInit() {

    this.blogService.reloadList.subscribe(() => this.ngOnInit());

    // ==========================================================
    // 		 									GET ALL BLOGS
    // ==========================================================
    this.subscription = this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
