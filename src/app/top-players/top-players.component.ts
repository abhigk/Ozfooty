import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.css']
})
export class TopPlayersComponent implements OnInit {

  constructor(private dataService : DataService) { }
  players = [];
  lastUpdated;

  ngOnInit() {
    this.dataService.getTopPlayers().then(
      (data: any) => {

        this.players = data.topPlayers;
        this.lastUpdated = data.lastUpdated;

      }
    );
  }

}
