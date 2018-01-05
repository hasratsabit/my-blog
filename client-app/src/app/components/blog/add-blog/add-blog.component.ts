import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  addBlogFormLoaded = true;
  categories;

  constructor(
    private location: Location,
    private categoryService: CategoryService
  ) { }

  toggleAddBlog() {
    this.addBlogFormLoaded = !this.addBlogFormLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data.cat;
    })
  }

}
