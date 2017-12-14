import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // For Select
  foods = [
	    {value: 'steak-0', viewValue: 'Steak'},
	    {value: 'pizza-1', viewValue: 'Pizza'},
	    {value: 'tacos-2', viewValue: 'Tacos'}
	  ];
}
