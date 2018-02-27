import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { fadeIn } from '../../../animations/animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
  animations: [ fadeIn ]
})
export class DeleteCategoryComponent implements OnInit, OnDestroy {


// ==========================================================
// 		                VARIABLES
// ==========================================================

  deletingCategory;
  processing = false;
  successIcon = false;
  alertMessage;
  alertMessageClass;
  subscription: Subscription


// ==========================================================
// 		                CONSTRUCTORS
// ==========================================================
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

// ==========================================================
// 		                DECORATORS
// ==========================================================
  @Input('categoryId') categoryId;
  @Input('deleteCategory')  deleteCategoryIsLoaded: Boolean = false;
  @Output('toggleDelete') toggleDelete:any = new EventEmitter();

// ==========================================================
// 		                CONSTRUCTORS
// ==========================================================
  toggleDeleteCategory() {
    this.toggleDelete.emit();
  }


// ==========================================================
// 		                DELETE CATEGORY
// ==========================================================
  onDeleteCategory() {
    this.processing = true;
    this.subscription = this.categoryService.deleteCategory(this.categoryId).subscribe(data => {
      if(!data.success){
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
      }else{
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.toggleDeleteCategory();
        }, 2000);
      }
    })
  }

// ==========================================================
// 		                LIFE CYCLE
// ==========================================================
  ngOnInit() {
    this.subscription = this.categoryService.getSingleCategory(this.categoryId).subscribe(data => {
      this.deletingCategory = data.cat.category;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
