import { CategoryService } from './../../../services/category.service';
import { fadeIn } from './../../../animations/animation';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [fadeIn]
})
export class CategoryListComponent implements OnInit, OnDestroy {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  categoreis;
  catId;
  subscription: Subscription



// ==========================================================
// 		                CONSTRUCTORS
// ==========================================================
  constructor(
    private categoryService: CategoryService
  ) { }


// ==========================================================
// 		                DECORATORS
// ==========================================================
  @Output('toggleCategory') toggleCategory:any = new EventEmitter();
  @Output('toggleUpdate') toggleUpdate:any = new EventEmitter();
  @Output('toggleDelete') toggleDelete:any = new EventEmitter();


// ==========================================================
// 		                EVENTS
// ==========================================================
  toggleAddCategoryForm() {
    this.toggleCategory.emit();
  }


  toggleUpdateCategory(id) {
    this.catId = id;
    this.toggleUpdate.emit();
  }


  toggleDeleteCategory(id){
    this.catId = id;
    this.toggleDelete.emit();
  }



// ==========================================================
// 		                LIFE CYCLE
// ==========================================================

  ngOnInit() {
    this.subscription = this.categoryService.getAllCategories().subscribe(data => {
      this.categoreis = data.cat;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
