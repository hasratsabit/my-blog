import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../../animations/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ fadeIn]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
