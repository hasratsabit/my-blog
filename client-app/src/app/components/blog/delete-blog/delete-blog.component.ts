import { Subscription } from 'rxjs';
import { fadeIn, toggleModal } from './../../../animations/animation';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.scss'],
  animations: [fadeIn, toggleModal]
})
export class DeleteBlogComponent implements OnInit, OnDestroy {

// ==========================================================
// 		 									VARIABLES 
// ==========================================================
  // deleteBlogIsLoaded = true;
  public successIcon: Boolean = false;
  public processing: Boolean = false;
  public alertMessage: String;
  public alertMessageClass: String;

  subscription: Subscription

// ==========================================================
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor(
    private blogService: BlogService
  ) { }

  @Input('blogId') deleteBlogId: String;
  @Input('loadDelete') deleteBlogIsLoaded: Boolean = false;
  @Output('toggleDelete') toggleDelete:any = new EventEmitter();




// ==========================================================
// 		 									DELETE TOGGLE
// ==========================================================
  toggleDeleteBlog(){
    this.toggleDelete.emit();
  }

// ==========================================================
// 		 									DELETE REQUEST
// ==========================================================
  onDeleteBlog(){
    this.processing = true;
    this.subscription = this.blogService.deleteBlog(this.deleteBlogId).subscribe(data => {
     if(!data.success){
      this.processing = false;
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-red'
      this.successIcon = false;
     }else {
      this.alertMessage = data.message;
      this.alertMessageClass = 'alert alert-green'
      this.successIcon = true;
      setTimeout(() => {
        this.processing = false;
        this.toggleDeleteBlog();
        this.subscription.unsubscribe();
      }, 2000);
     } 
    })
  }


  

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
