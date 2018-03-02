import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { fadeIn, toggleModal } from '../../../animations/animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
  animations: [ fadeIn, toggleModal ]
})
export class DeleteCategoryComponent implements OnInit, OnDestroy {


// ==========================================================
// 		                VARIABLES
// ==========================================================
  public deleteCategoryIsLoaded: Boolean = false;
  public processing: Boolean = false;
  public successIcon: Boolean = false;
  public alertMessage: String;
  public alertMessageClass: String;
  public categoryId: String;
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
// 		                CONSTRUCTORS
// ==========================================================
  toggleDeleteCategory() {
    this.deleteCategoryIsLoaded = !this.deleteCategoryIsLoaded;
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
          this.processing = false;
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.categoryService.reloadSiblingOnUpdate(); // Update any component thats subscribed to this.
          this.toggleDeleteCategory();
          this.subscription.unsubscribe();
        }, 2000);
      }
    })
  }

// ==========================================================
// 		                LIFE CYCLE
// ==========================================================
  ngOnInit() {
    this.subscription = this.categoryService.listChannel.subscribe(data => {
      if(data.type === 'delete'){
        this.categoryId = data.id;
        this.toggleDeleteCategory()
      }else {
        return false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
