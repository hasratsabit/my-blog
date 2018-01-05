import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { fadeIn } from '../../../animations/animation';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  animations: [ fadeIn ]
})
export class AddCategoryComponent implements OnInit {


// ==========================================================
// 		                VARIABLES
// ==========================================================
  form;
  alertMessage;
  alertMessageClass;
  successIcon = false;
  processing = false;
  categoryFormLoaded = true;


// ==========================================================
// 		                CONSTRUCTOR
// ==========================================================
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
      this.createCategoryForm();
    }

  closeMessage() {
    this.alertMessage = undefined;
    this.alertMessageClass = undefined;
  }

// ==========================================================
// 		                TOGGLE METHOD
// ==========================================================

  toggleCategoryForm(){
    this.categoryFormLoaded = !this.categoryFormLoaded;
    setTimeout(() => {
      this.location.back();
    }, 500);
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


  disableForm(){
    this.form.controls['category'].disable();
  }

  enableForm(){
    this.form.controls['category'].enable();
  }

// ==========================================================
// 		                CREATE FORM & VALIDATION
// ==========================================================
  onCategorySubmit() {
    this.processing = true;
    this.disableForm();
    const category = {
      category: this.form.get('category').value
    }
    this.categoryService.postCategory(category).subscribe(data => {
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
          this.toggleCategoryForm();
        }, 2000);
      }
    })
  }




  ngOnInit() {

  }

}
