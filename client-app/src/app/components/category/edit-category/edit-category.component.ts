import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { fadeIn, expandCollapse } from '../../../animations/animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [ fadeIn, expandCollapse ]
})
export class EditCategoryComponent implements OnInit, OnDestroy {

// ==========================================================
// 		                VARIABLES
// ==========================================================
  form;
  processing = false;
  successIcon = false;
  alertMessage;
  alertMessageClass;
  subcription: Subscription;

  categories = {
    category: String
  }


// ==========================================================
// 		                CONSTRUCTORS
// ==========================================================
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.createCategoryForm()
   }

// ==========================================================
// 		                DECORATORS
// ==========================================================
   @Input('updateCategory') updateCategoryIsLoaded: Boolean = false;
   @Input('categoryId') categoryId;
   @Output('toggleUpdate') toggleUpdate:any = new EventEmitter();


   toggleUpdateCategory() {
     this.toggleUpdate.emit();
   }


// ==========================================================
// 		                CREATE FORM & VALIDATION
// ==========================================================

createCategoryForm() {
  this.form = this.formBuilder.group({
    category: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
      this.validCategory
    ])]
  })
}

validCategory(controls) {
  const regExp = new RegExp(/^[a-zA-Z ]+$/);
  if(regExp.test(controls.value)){
    return null;
  }else{
    return { 'validCategory': true }
  }
}


// ==========================================================
// 		                ENABLE AND DISABLE 
// ==========================================================
disableForm(){
  this.form.controls['category'].disable();
}

enableForm(){
  this.form.controls['category'].enable();
}


// ==========================================================
// 		                UPDATE CATEGORY
// ==========================================================
  onUpdateCategory() {
    this.processing = true;
    this.disableForm();
    this.subcription = this.categoryService.updateCategory(this.categories).subscribe(data => {
      if(!data.success){
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.processing = false;
        this.enableForm();
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        setTimeout(() => {
          this.processing = false;
          this.toggleUpdateCategory();
          this.form.reset();
          this.enableForm();
        }, 2000);
      }
    })

  }

// ==========================================================
// 		                LIFE CYCLE
// ==========================================================
  ngOnInit() {
    this.subcription =  this.categoryService.getSingleCategory(this.categoryId).subscribe(data => {
      this.categories = data.cat;
    })
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}