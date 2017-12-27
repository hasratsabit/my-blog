import { Component, OnInit } from '@angular/core';
import { fadeIn, rainFall } from '../../animations/animation';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ fadeIn, rainFall]

})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
