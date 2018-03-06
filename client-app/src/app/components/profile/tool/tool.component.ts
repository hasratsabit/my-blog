import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { expandCollapse, fadeIn } from '../../../animations/animation';
import { ProfileService } from './../../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class ToolComponent implements OnInit {

  FormGroup;
  toolForm;
  processing: Boolean = false;
  alertMessage: String;
  alertMessageClass: String;
  successIcon: Boolean = false;
  singleTool = {};

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.createToolForm();
   }
   @Input() authorizedUsername;
   @Input() tools;
   @Input() url;
   @Output() reloadPage = new EventEmitter(); 


   // This refereshes the page in the profile component when skill is updated.
   refreshPage() {
     this.reloadPage.emit();
   }


// ==========================================================
// 		 					          TOOL FORM 
// ==========================================================
  createToolForm() {
    this.toolForm = this.formBuilder.group({
      tool: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.validToolChecker
      ])],
      level: ['', Validators.required],
      start: ['', Validators.required]
    })
  }


// ==========================================================
// 		 					TITLE VALIDATION
// ==========================================================
 validToolChecker(controls) {
  // Valid title expression
  const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
  if(regExp.test(controls.value)){
    return null
  }else {
    return { 'validToolChecker': true }
  }

}



// ==========================================================
// 		 					          TOOL 
// ==========================================================
toolFormIsLoaded = false;

toggleToolForm(){
  this.toolFormIsLoaded = !this.toolFormIsLoaded;
}


// ==========================================================
// 		 					ENABLE AND DISABLE
// ==========================================================

disableForm(){
  this.toolForm.controls['tool'].disable();
  this.toolForm.controls['level'].disable();
  this.toolForm.controls['start'].disable();

}


enableForm(){
  this.toolForm.controls['tool'].enable();
  this.toolForm.controls['level'].enable();
  this.toolForm.controls['start'].enable();

}



// ==========================================================
// 		 					         ADD TOOL
// ==========================================================
  onToolSubmit(){
    this.processing = true;
    this.disableForm();
    
    const tools = {
      tool: this.toolForm.get('tool').value,
      level: this.toolForm.get('level').value,
      start: this.toolForm.get('start').value
    }

    this.profileService.addTool(this.url.username, tools).subscribe(data => {
      if(!data.success){
        this.processing = false;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.enableForm();
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        this.refreshPage();
        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.processing = false;
          this.toolForm.reset();
          this.enableForm();
          this.toggleToolForm();
        }, 2000)
      }
    })
  }


// ==========================================================
// 		 					         UPDATE TOOL
// ==========================================================
  updateingToolId;
  updateToolFormIsLoaded: Boolean;

  toggleUpdateTool(id){
    this.updateingToolId = id;
    this.updateToolFormIsLoaded = !this.updateToolFormIsLoaded;
    this.getSingleTool(this.url.username, id);
  }

  cancelUpdateToolForm() {
    this.updateToolFormIsLoaded = false;
    this.toolForm.reset();
  }

  getSingleTool(username, id){
    this.profileService.getSingleTool(username, id)
    .subscribe(data => {
      this.singleTool = data.tool;
    })
  }


  onUpdateToolSubmit() {
    this.processing = true;
    this.disableForm();
    
    const tool = {
      tool: this.toolForm.get('tool').value,
      level: this.toolForm.get('level').value,
      start: this.toolForm.get('start').value
    }

    this.profileService.updateTool(this.url.username, this.updateingToolId, tool).subscribe(data => {
      if(!data.success){
        this.processing = false;
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.enableForm();
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        this.refreshPage();
        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.processing = false;
          this.enableForm();
          this.cancelUpdateToolForm();
        }, 2000)
      }
    })
  }



// ==========================================================
// 		 					         DELETE TOOL
// ==========================================================

  toolIsDeleting: Boolean = false;
  deletingToolId;



  toggleDeleteTool(id) {
    this.toolIsDeleting = !this.toolIsDeleting;
    this.deletingToolId = id;
  }



  onDeleteTool() {
    this.profileService.deleteTool(this.url.username, this.deletingToolId)
    .subscribe(data => {
      if(data.success) {
        this.refreshPage();
        this.toolIsDeleting = false;
      }
    })
  }





  formatDate(date):any {
    let currentDate, startYear, splitDate, workYears;
    currentDate = new Date();
    splitDate = date.split('-');
    startYear = splitDate[0];
  

    if(startYear == currentDate.getFullYear()){
      workYears = `Less than a year`;
    }else {
      workYears = `${currentDate.getFullYear() - startYear} Years`;
    }

    return workYears;
  
  }











  ngOnInit() {
  }

}





