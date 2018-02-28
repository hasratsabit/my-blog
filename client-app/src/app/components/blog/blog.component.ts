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
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor() { }





// ==========================================================
// 		 									ADD BLOG
// ==========================================================

  addBlogFormIsLoaded = false;

  loadAddBlogForm() {
    this.addBlogFormIsLoaded = !this.addBlogFormIsLoaded;
  }

  ngOnInit() {
  

  }

}
