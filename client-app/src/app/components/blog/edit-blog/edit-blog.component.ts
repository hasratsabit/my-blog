import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  editFormLoaded = true;

  constructor(
    private location: Location
  ) { }

  toggleEditBlog() {
    this.editFormLoaded = !this.editFormLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

  ngOnInit() {
  }

}
