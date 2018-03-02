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
  subscription: Subscription



// ==========================================================
// 		                CONSTRUCTORS
// ==========================================================
  constructor(
    private categoryService: CategoryService
  ) { }


// ==========================================================
// 		                SUBJECT COMMUNICTION LINE
// ==========================================================


  toggleAddCategory(){
    const data = { type: 'add'};
    this.categoryService.sendDataToSibling(data);
  }

  toggleUpdateCategory(id) {
    const data = { id: id, type: 'edit'}
    this.categoryService.sendDataToSibling(data);
  }


  toggleDeleteCategory(id){
    const data = { id: id, type: 'delete'}
    this.categoryService.sendDataToSibling(data);
  }


// ==========================================================
// 		                LIFE CYCLE
// ==========================================================

  ngOnInit() {
    this.subscription = this.categoryService.getAllCategories().subscribe(data => {
      this.categoreis = data.cat;
    })

    // This will update the list if any category is deleted or updated.
    this.subscription = this.categoryService.reloadOnUpdate.subscribe(() => this.ngOnInit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
