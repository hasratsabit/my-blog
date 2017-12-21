import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('clickEvent', [
      state('default', style({
        width: '100px'
      })),
      state('land', style({
        width: '200px'
      })),
      transition('default <=> land', animate('1s 500ms ease-in'))
    ])
  ]
})
export class AnimationComponent implements OnInit {
  animateBox;
  boxCliked = false;
  startAnimate = false;
  openBox = false;

  constructor() { }


  onBoxAnimation() {
    this.animateBox = 'default';
    setTimeout(() => {
      this.animateBox = 'land';
    }, 1000)
  }

  ngOnInit() {
  }

}
