import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { expandCollapse, fadeIn } from '../../../animations/animation';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class SkillComponent implements OnInit {

  FormGroup
  skillForm;
  alertMessage;
  alertMessageClass;
  successIcon = false;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.createSkillForm();
   }

  @Input() authorizedUsername;
  @Input() url;
  @Input() skills;
  @Output() reloadPage = new EventEmitter(); 


  // This refereshes the page in the profile component when skill is updated.
  refreshPage() {
    this.reloadPage.emit();
  }


// ==========================================================
// 		 					          SKILL
// ==========================================================
skillFormIsLoaded = false;

toggleSkillForm(){
  this.skillFormIsLoaded = !this.skillFormIsLoaded;
  this.skillForm.reset();
}




// ==========================================================
// 		 					          CREATE SKILL FORM
// ==========================================================

  createSkillForm(){
    this.skillForm = this.formBuilder.group({
      language: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        this.validateLanguage
      ])],
      start: Validators.required,
      level: Validators.required
    });
  }


// ==========================================================
// 		 					LANGUAGE VALIDATION
// ==========================================================
validateLanguage(controls) {
  // Valid title expression
  const regExp = new RegExp(/^[a-zA-Z0-9-, ]+$/);
  if(regExp.test(controls.value)){
    return null
  }else {
    return { 'validateLanguage': true }
  }
}


// ==========================================================
// 		 					ENABLE AND DISABLE
// ==========================================================

disableForm(){
  this.skillForm.controls['language'].disable();
  this.skillForm.controls['level'].disable();
  this.skillForm.controls['start'].disable();

}


enableForm(){
  this.skillForm.controls['language'].enable();
  this.skillForm.controls['level'].enable();
  this.skillForm.controls['start'].enable();

}



// ==========================================================
// 		 					POST SKILL
// ==========================================================
onSubmitSkill(){
  this.processing = true;
  this.disableForm();

  const skill = {
    language: this.skillForm.get('language').value,
    level: this.skillForm.get('level').value,
    start: this.skillForm.get('start').value
  }

  this.profileService.addSkill(this.url.username, skill).subscribe(data => {
    if(!data.success){
      this.processing = false;
      this.enableForm();
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-red';
      this.successIcon = false;
    }else {
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-green';
      this.successIcon = true;
      this.refreshPage(); // Reload the page in the profile component.
      setTimeout(() => {
        this.processing = false;
        this.alertMessageClass = null;
        this.alertMessage = null;
        this.toggleSkillForm();
        this.enableForm();
        this.skillForm.reset();
      }, 2000);
    }
  })
}



// ==========================================================
// 		 					          EDIT SKILL
// ==========================================================
updateSkillIsLoaded = false;
updateSkillId
singleSkill = {};

  toggleUpdateSkill(id){
    this.updateSkillId = id;
    this.updateSkillIsLoaded = true;
    this.getSingleSkill(this.url.username, id);
  }

  cancelUpdateSkill(){
    this.updateSkillIsLoaded = false;
    this.skillForm.reset();
  }


  onUpdateSkill() {
    const skill = {
      language: this.skillForm.get('language').value,
      level: this.skillForm.get('level').value,
      start: this.skillForm.get('start').value
    }

    this.profileService.updateSingleSkill(this.url.username, this.updateSkillId, skill)
    .subscribe(data => {
      if(!data.success){
        this.processing = false;
        this.enableForm();
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-red';
        this.successIcon = false;
      }else {
        this.alertMessage = data.message;
        this.alertMessageClass = 'alert alert-green';
        this.successIcon = true;
        this.refreshPage();
        setTimeout(() => {
          this.processing = false;
          this.alertMessageClass = null;
          this.alertMessage = null;
          this.cancelUpdateSkill();
        }, 2000);
      }
    })
  }


// ==========================================================
// 		 					          DELETE SKILL
// ==========================================================
  skillIsDeleting = false;
  deletingSkillId

  toggleDeleteSkill(id){
    this.deletingSkillId = id;
    this.skillIsDeleting = !this.skillIsDeleting;
    
  }


  onDeleteSkill() {
    this.profileService.deleteSkill(this.url.username, this.deletingSkillId).subscribe((data) => {
      this.refreshPage();
      this.toggleDeleteSkill(this.deletingSkillId);
    })
  }





  getSingleSkill(username, id){
    this.profileService.getSingleSkill(username, id).subscribe(data => {
      this.singleSkill = data.skill;
    });
  }



  ngOnInit() {

  }

}
