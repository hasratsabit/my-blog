import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { expandCollapse, fadeIn } from '../../../animations/animation';
import { ProfileService } from './../../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [expandCollapse, fadeIn]
})
export class AboutComponent implements OnInit {

  aboutForm;
  processing: Boolean = false;
  alertMessage: String;
  alertMessageClass: String;
  successIcon: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.createAboutForm();
   }
  
  @Input() authorizedUsername;
  @Input() profile;
  @Input() url;
  @Output() reloadPage = new EventEmitter(); 

   // This refereshes the page in the profile component when skill is updated.
   refreshPage() {
    this.reloadPage.emit();
  }

  
// ==========================================================
// 		 					          CREATE ABOUT FORM
// ==========================================================
  
  createAboutForm() {
    this.aboutForm = this.formBuilder.group({
      about: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(1500)
      ])]
    })
  }


  disableForm() {
    this.aboutForm.controls['about'].disable();
  }

  enableForm() {
    this.aboutForm.controls['about'].enable();
  }





// ==========================================================
// 		 					          TOGGLE ABOUT FORM
// ==========================================================
aboutFormIsLoaded = false;

toggleaboutForm(){
  this.aboutFormIsLoaded = !this.aboutFormIsLoaded
}


  onAboutSubmit() {

    this.processing = true;

    const about = {
      about: this.aboutForm.get('about').value
    }

    this.profileService.addAbout(this.url.username, about)
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
        setTimeout(() => {
          this.alertMessage = null;
          this.alertMessageClass = null;
          this.enableForm();
          this.aboutFormIsLoaded = false;
          this.processing = false;
        }, 2000);
      }
    })
    

  }
 
  ngOnInit() {
  }

}
