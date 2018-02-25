import { UserService } from './../../services/user.service';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit, ElementRef, Output } from '@angular/core';
import { fadeInDown, fadeInLeft, fadeIn, rainFall} from '../../animations/animation';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [fadeInDown, fadeInLeft, fadeIn, rainFall],
  outputs: ['postStatusClass']
})
export class BlogComponent implements OnInit {

// ==========================================================
// 		 									VARIABLES
// ==========================================================
  blogs;
  username;
  isPublished: Boolean = false;
  postStatusClass;

// ==========================================================
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private element: ElementRef
  ) { }


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


// ==========================================================
// 		 									ADD BLOG
// ==========================================================

  addBlogFormIsLoaded = false;

  loadAddBlogForm() {
    console.log('works');
    this.addBlogFormIsLoaded = !this.addBlogFormIsLoaded;
  }










  ngOnInit() {
  
// ==========================================================
// 		 									GET ALL BLOGS
// ==========================================================
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs
    })

// ==========================================================
// 		 									GET USER PROFILES
// ==========================================================
    this.userService.getUserProfile().subscribe(data => {
     if(!data.success) {
       return null;
     }else {
      this.username = data.user.username;
     }
    })
  }

}
