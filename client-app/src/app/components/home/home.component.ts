import { AuthService } from './../../services/auth.service';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
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
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs
    })
  }

}
