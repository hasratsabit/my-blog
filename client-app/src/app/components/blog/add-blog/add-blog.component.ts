import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  addBlogFormLoaded = true;

  constructor(
    private location: Location
  ) { }

  toggleAddBlog() {
    this.addBlogFormLoaded = !this.addBlogFormLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

  ngOnInit() {
  }

}
