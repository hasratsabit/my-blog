import { BlogListComponent } from './blog-list/blog-list.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { UserService } from './../../services/user.service';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit, ElementRef, Output, ViewChild } from '@angular/core';
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
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor() { }

  @ViewChild('delete') DeleteChild: DeleteBlogComponent;
  @ViewChild('list') ListChild: BlogListComponent;





// ==========================================================
// 		 									ADD BLOG
// ==========================================================

  public addBlogFormIsLoaded: Boolean = false;
  public deleteBlogIsLoaded: Boolean = false;
  public deleteBlogId;

  loadAddBlogForm() {
    this.addBlogFormIsLoaded = !this.addBlogFormIsLoaded;
  }

  loadDeleteBlog() {
    this.deleteBlogIsLoaded = !this.deleteBlogIsLoaded;
    if(this.deleteBlogIsLoaded){
      this.deleteBlogId = this.ListChild.blogId;
    }
  }

  ngOnInit() {
  

  }

}
