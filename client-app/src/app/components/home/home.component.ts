import { Component, OnInit } from '@angular/core';
import { fadeIn, rainFall } from '../../animations/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ fadeIn, rainFall]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
