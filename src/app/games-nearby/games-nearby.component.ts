// Author: Ravi Rathore
// This class gets nearest stadium to a given post code and then gets
// all the games for that stadium to be played in future.

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-games-nearby',
  templateUrl: './games-nearby.component.html',
  styleUrls: ['./games-nearby.component.css']
})
export class GamesNearbyComponent implements OnInit {
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  games = []; // store the games
  hasSearched: boolean = false; // check if search was done by user; used to display prompt message
  // to the user

  postcode; // stores the postcode from the user
  constructor(private service: DataService) { }

  ngOnInit() { }

  getNearByMatches() {

    // get games for the given postcode
    this.service.getLatLonFromPostCode(this.postcode).then(
      (data: any) => {

        let nearestStadium = this.service.getNearestStadiums(data.lat, data.lng);
        // console.log(nearestStadium);
        // get future games
        this.service.getGamesNearStadium(nearestStadium).then(
          (games) => {
            this.games = [];

            for (const index in games) {

              const game = games[index];
              let da = Date.parse(game.date);
              // console.log(da.toLocaleString('en-US'));
              this.games.push({ ateam: game.ateam, hteam: game.hteam, venue: game.venue, date: game.date });
            }
            this.hasSearched = true; // user has executed search
          }
        );


      }
    );
  }

}
