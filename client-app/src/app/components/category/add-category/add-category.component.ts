import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { fadeIn, toggleModal } from '../../../animations/animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  animations: [ fadeIn, toggleModal ]
})
export class AddCategoryComponent implements OnInit, OnDestroy {


// ==========================================================
// 		                VARIABLES
// ==========================================================
  form;
  alertMessage;
  alertMessageClass;
  successIcon = false;
  processing = false;
  public addCategoryIsLoaded: Boolean = false;
  subscription: Subscription;
// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
      this.createCategoryForm();
    }


// ==========================================================
// 		                  DECORATORS
// ==========================================================

  toggleAddCategoryForm() {
    this.addCategoryIsLoaded = !this.addCategoryIsLoaded;
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
// 		                FORM ENABLE AND DISABLE
// ==========================================================
  disableForm(){
    this.form.controls['category'].disable();
  }

  enableForm(){
    this.form.controls['category'].enable();
  }

// ==========================================================
// 		                ADD CATEGORY
// ==========================================================
  onCategorySubmit() {
    this.processing = true;
    this.disableForm();
    const category = {
      category: this.form.get('category').value
    }
    this.subscription = this.categoryService.postCategory(category).subscribe(data => {
      if(!data.success){
        this.processing = false;
        this.successIcon = false;
        this.enableForm();
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
      }else{
        this.processing = true;
        this.successIcon = true;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        setTimeout(() => {
          this.processing = false;
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.enableForm();
          this.form.reset();
          this.categoryService.reloadSiblingOnUpdate();
          this.toggleAddCategoryForm();
        }, 2000);
      }
    })
  }



// ==========================================================
// 		                LIFE CYCLE
// ==========================================================
  ngOnInit() {
    this.subscription = this.categoryService.listChannel.subscribe(data => {
      if(data.type === 'add'){
        this.toggleAddCategoryForm();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}