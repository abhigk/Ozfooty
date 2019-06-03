import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styleUrls: ['./ladder.component.css']
})
export class LadderComponent implements OnInit {
  ladderData: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLadderData();
  }


  getLadderData() {
    this.dataService.getLadder().then((data) => {
        console.log('LADDER-> ', data);
        this.ladderData = data;
    });
  }
}
