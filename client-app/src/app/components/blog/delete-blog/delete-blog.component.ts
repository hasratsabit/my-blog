import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.scss']
})
export class DeleteBlogComponent implements OnInit {

  deleteBlogIsLoaded = true;

  constructor(
    private location: Location
  ) { }

  toggleDelete() {
    this.deleteBlogIsLoaded = !this.deleteBlogIsLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

  ngOnInit() {
  }

}
