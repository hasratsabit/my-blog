import { UserService } from './../../services/user.service';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { fadeInDown, fadeInLeft, fadeIn, rainFall} from '../../animations/animation';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [fadeInDown, fadeInLeft, fadeIn, rainFall]
})
export class BlogComponent implements OnInit {

// ==========================================================
// 		 									VARIABLES
// ==========================================================
  blogs;
  username

// ==========================================================
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) { }



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
