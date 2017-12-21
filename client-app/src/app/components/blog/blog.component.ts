import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  postFormLoaded: boolean = false;

  constructor() { }

  loadPostForm() {
    this.postFormLoaded = true;
  }

  cancelPostForm() {
    this.postFormLoaded = false;
  }

  ngOnInit() {
  }

}
