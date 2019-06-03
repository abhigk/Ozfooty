import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'ozfooty';
  constructor(public dataService: DataService) {

  }
  ngOnInit(): void {
    this.dataService.getLadder().then(
      (result) => {

        console.log("received in app component"+result);

      }
    );
  }
}
