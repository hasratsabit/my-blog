import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryLoaded = true;

  constructor(
    private location: Location
  ) { }

  toggleEditCategory() {
    this.editCategoryLoaded = !this.editCategoryLoaded;
    setTimeout(() => {
      this.location.back();
    } 500)
  }

  ngOnInit() {
  }

}
