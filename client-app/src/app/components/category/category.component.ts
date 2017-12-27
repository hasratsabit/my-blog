import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animation';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [ fadeIn]
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
