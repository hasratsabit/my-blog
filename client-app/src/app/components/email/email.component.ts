import { Component, OnInit } from '@angular/core';
import { fadeIn, rainFall } from '../../animations/animation';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [ fadeIn, rainFall]
})
export class EmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
