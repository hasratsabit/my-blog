import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [ fadeIn ]
})
export class EditCategoryComponent implements OnInit {

  processing = false;
  successIcon = false;
  editingCategoryUrl;
  alertMessage;
  alertMessageClass;
  editCategoryLoaded = true;

  categories = {
    category: String
  }

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  toggleEditCategory() {
    this.editCategoryLoaded = !this.editCategoryLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500)
  }



  onUpdateCategory() {
    this.processing = true;
    this.categoryService.updateCategory(this.categories).subscribe(data => {
      if(!data.success){
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.processing = false;
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.toggleEditCategory();
        }, 2000);
      }
    })

  }

  ngOnInit() {
    this.editingCategoryUrl = this.activatedRoute.snapshot.params;
    this.categoryService.getSingleCategory(this.editingCategoryUrl.id).subscribe(data => {
      this.categories = data.cat;
    })
  }

}
