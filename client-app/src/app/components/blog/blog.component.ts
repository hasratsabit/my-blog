import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { fadeInDown, fadeInLeft, fadeIn, rainFall} from '../../animations/animation';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [fadeInDown, fadeInLeft, fadeIn, rainFall]
})
export class BlogComponent implements OnInit {



  constructor(
    private blogService: BlogService
  ) { }



  ngOnInit() {
  }

}
