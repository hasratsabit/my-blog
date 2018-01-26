import { Location } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit, Input } from '@angular/core';
import { fadeIn } from '../../animations/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ fadeIn]
})
export class HomeComponent implements OnInit {

  blogs;
  BlogMessage;

  constructor(
    private blogService: BlogService,
    public authService: AuthService,
    private location: Location
  ) {}

  updateBlogView(id){
    this.blogService.updateBlogView(id)
    .subscribe(data => {
      if(!data.success) return null;
    })
  }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs;
    })
  }

}
