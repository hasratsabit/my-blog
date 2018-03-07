import { Subscription } from 'rxjs';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  blogs;

  constructor(private blogService: BlogService) { }

  subscription: Subscription

  ngOnInit() {
    this.subscription = this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs;
    })
  }

}
