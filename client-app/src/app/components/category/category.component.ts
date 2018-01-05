import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animation';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [ fadeIn]
})
export class CategoryComponent implements OnInit {

  categoreis;

  constructor(
    private categoryService: CategoryService
  ) { }


  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categoreis = data.cat;
    })
  }

}
