import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryFormLoaded = true;

  constructor(
    private location: Location
  ) { }

  toggleCategoryForm(){
    this.categoryFormLoaded = !this.categoryFormLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }

  ngOnInit() {
  }

}
