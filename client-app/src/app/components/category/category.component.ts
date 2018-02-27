import { Component, OnInit, ViewChild } from '@angular/core';
import { expandCollapse } from './../../animations/animation';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [expandCollapse]
})
export class CategoryComponent implements OnInit {

// ==========================================================
// 		                VARIABLES
// ==========================================================  
  addCategoryFormIsLoaded: Boolean = false;
  updateCategoryFormIsLoaded: Boolean = false;
  deleteCategoryIsLoaded: Boolean = false;
  clickedId;


// ==========================================================
// 		                CONSTRUCTORS
// ==========================================================
  constructor() { }

// ==========================================================
// 		                DECORATORS
// ==========================================================
  @ViewChild('list') ListChild: CategoryListComponent
  @ViewChild('edit') UpdateChild: EditCategoryComponent
  @ViewChild('add') AddChild: AddCategoryComponent
  @ViewChild('delete') DeleteChild: DeleteCategoryComponent


// ==========================================================
// 		                TOGGLE METHODS
// ==========================================================

  // Update Form
  toggleUpdateCategory() {
    this.updateCategoryFormIsLoaded = !this.updateCategoryFormIsLoaded;
    if(this.updateCategoryFormIsLoaded){
      this.clickedId = this.ListChild.catId // If toggled, get the category id from the list.
    }else {
      return null;
    }
  }

  // Delete Modal
  toggleDeleteCategory() {
    this.deleteCategoryIsLoaded = !this.deleteCategoryIsLoaded;
    if(this.deleteCategoryIsLoaded){
      this.clickedId = this.ListChild.catId;// If toggled, get the category id from the list.
    }else {
      return null;
    }
  }

  // Add Form
  toggleCategoryForm() {
    this.addCategoryFormIsLoaded = !this.addCategoryFormIsLoaded;
  }


// ==========================================================
// 		                LIFE CYCLE
// ==========================================================

  ngOnInit() {

  }

}