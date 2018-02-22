import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { expandCollapse, fadeIn } from '../../../animations/animation';
import { ProfileService } from './../../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class ProjectComponent implements OnInit {

  alertMessage: String;
  alertMessageClass: String;
  successIcon: Boolean = false;
  processing: Boolean = false;
  projectForm;
  FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) { 
    this.createProjectForm();
  }

  @Input() authorizedUsername;
  @Input() url;
  @Input() projects;
  @Output() reloadPage = new EventEmitter(); 


  // This refereshes the page in the profile component when skill is updated.
  refreshPage() {
    this.reloadPage.emit();
  }

// ==========================================================
// 		 					          CREATE PROJECT FORM 
// ==========================================================
  createProjectForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.validValueChecker
      ])],
      tech: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.validValueChecker
      ])],
      link: ['', Validators.required]
    })
  }


// ==========================================================
// 		 					TITLE TECH VALIDATION
// ==========================================================
validValueChecker(controls) {
  // Valid title expression
  const regExp = new RegExp(/^[a-zA-Z0-9-, ]+$/);
  if(regExp.test(controls.value)){
    return null
  }else {
    return { 'validValueChecker': true }
  }

}

// ==========================================================
// 		 					ENABLE AND DISABLE
// ==========================================================

disableForm(){
  this.projectForm.controls['title'].disable();
  this.projectForm.controls['tech'].disable();
  this.projectForm.controls['link'].disable();

}


enableForm(){
  this.projectForm.controls['title'].enable();
  this.projectForm.controls['tech'].enable();
  this.projectForm.controls['link'].enable();

}


// ==========================================================
// 		 					          ADD PROJECT 
// ==========================================================
 projectFormIsLoaded = false;

 toggleProjectForm(){
   this.projectFormIsLoaded = !this.projectFormIsLoaded;
 }


 onProjectSubmit() {

  this.processing = true;

  const project = {
    title: this.projectForm.get('title').value,
    tech: this.projectForm.get('tech').value,
    link: this.projectForm.get('link').value,
  }

  this.profileService.addProject(this.url.username, project)
  .subscribe(data => {
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
      this.refreshPage();
      this.disableForm();
      setTimeout(() => {
        this.processing = false;
        this.alertMessage = null;
        this.alertMessageClass = null;
        this.enableForm();
        this.projectForm.reset();
        this.projectFormIsLoaded = false;
      }, 2000);
    }
  })

 }



// ==========================================================
// 		 					          UPDATE PROJECT 
// ==========================================================

 updatingProjId
 updateProjFormIsLoaded = false;
 singleProj = {};

  toggleUpdateProjForm(id) {
    this.updateProjFormIsLoaded = !this.updateProjFormIsLoaded;
    this.updatingProjId = id;
    this.singleProject(this.url.username, id);
  }

  cancelUpdateProj() {
    this.updateProjFormIsLoaded = false;
  }

  singleProject(username, id) {
    this.profileService.getSingleProj(username, id)
    .subscribe(data => {
      this.singleProj = data.singleProj;
    })
  }


  onUpdateProjSubmit() {

    this.processing = true;
    this.disableForm();

    const project = {
      title: this.projectForm.get('title').value,
      tech: this.projectForm.get('tech').value,
      link: this.projectForm.get('link').value,
    }

    this.profileService.updateProject(this.url.username, this.updatingProjId, project)
    .subscribe(data => {
      if(!data.success) {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
        this.processing = false;
        this.enableForm();
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        this.refreshPage();
        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.updateProjFormIsLoaded = false;
          this.projectForm.reset();
          this.enableForm();
        }, 2000);
      }
    })
  }


 // ==========================================================
// 		 					          DELETE PROJECT 
// ==========================================================

  deleteProjIsLoaded = false;
  deletingProjId;


  toggleDeleteProj(id) {
    this.deleteProjIsLoaded = !this.deleteProjIsLoaded;
    this.deletingProjId = id;
  }


  cancelDeleteProj() {
    this.deleteProjIsLoaded = false;
  }


  onDeleteProject() {
    this.profileService.deleteProject(this.url.username, this.deletingProjId)
    .subscribe(data => {
      this.deleteProjIsLoaded = false;
      this.refreshPage();
    })
  }






  ngOnInit() {
  }

}
