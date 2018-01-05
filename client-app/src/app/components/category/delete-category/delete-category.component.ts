import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
  animations: [ fadeIn ]
})
export class DeleteCategoryComponent implements OnInit {

  deletedCategoryUrl
  deletingCategory;
  processing = false;
  successIcon = false;
  alertMessage;
  alertMessageClass;
  deleteCategoryIsLoaded = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  closeMessage() {
    this.alertMessage = undefined;
    this.alertMessageClass = undefined;
  }

  toggleDeleteCategory(){
    this.deleteCategoryIsLoaded = !this.deleteCategoryIsLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
  }


  onDeleteCategory() {
    this.processing = true;
    this.categoryService.deleteCategory(this.deletedCategoryUrl.id).subscribe(data => {
      if(!data.success){
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
      }else{
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.toggleDeleteCategory();
        }, 2000);
      }
    })
  }

  ngOnInit() {
    this.deletedCategoryUrl = this.activatedRoute.snapshot.params;
    this.categoryService.getSingleCategory(this.deletedCategoryUrl.id).subscribe(data => {
      this.deletingCategory = data.cat.category;
    })
  }

}
