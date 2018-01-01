import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  deleteCategoryIsLoaded = true;

  constructor(
    private location: Location
  ) { }

  toggleDeleteCategory(){
    this.deleteCategoryIsLoaded = !this.deleteCategoryIsLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

  ngOnInit() {
  }

}
