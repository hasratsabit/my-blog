import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  loadedCategoryForm: Boolean = false;

  constructor() { }


  loadCategoryForm() {
    this.loadedCategoryForm = true;
  }

  cancelCategoryForm() {
    this.loadedCategoryForm = false;
  }

  ngOnInit() {
  }

}
