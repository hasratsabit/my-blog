import { Subscription } from 'rxjs';
import { fadeIn, toggleModal } from './../../../animations/animation';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, OnDestroy} from '@angular/core';


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
  public deleteBlogIsLoaded: Boolean = false;
  public successIcon: Boolean = false;
  public processing: Boolean = false;
  public alertMessage: String;
  public alertMessageClass: String;
  public blogId: String;

  subscription: Subscription

// ==========================================================
// 		 									CONSTRUCTOR 
// ==========================================================
  constructor(
    private blogService: BlogService
  ) { }




// ==========================================================
// 		 									DELETE TOGGLE
// ==========================================================
  toggleDeleteBlog(){
    this.deleteBlogIsLoaded = !this.deleteBlogIsLoaded;
  }

// ==========================================================
// 		 									DELETE REQUEST
// ==========================================================
  onDeleteBlog(){
    this.processing = true;
    this.subscription = this.blogService.deleteBlog(this.blogId).subscribe(data => {
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
        this.alertMessage = null;
        this.alertMessageClass = null;
        this.toggleDeleteBlog();
        this.blogService.updateBlogList();
      }, 2000);
     } 
    })
  }


  

  ngOnInit() {
    this.subscription = this.blogService.blogListChannel.subscribe(data => {
      if(data.type === 'delete'){
        this.blogId = data.id;
        this.toggleDeleteBlog();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
