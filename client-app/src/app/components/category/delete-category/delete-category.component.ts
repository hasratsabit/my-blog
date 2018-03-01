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

  public processing: Boolean = false;
  public successIcon: Boolean = false;
  public alertMessage: String;
  public alertMessageClass: String;
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
          this.processing = false;
          this.alertMessage = null;
          this.alertMessageClass = null;
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
  }

  ngOnDestroy() {
  }

}
