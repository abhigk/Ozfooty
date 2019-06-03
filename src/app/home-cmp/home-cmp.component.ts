import { Component, OnInit } from '@angular/core';
import {Game} from '../model/game.model';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-home-cmp',
  templateUrl: './home-cmp.component.html',
  styleUrls: ['./home-cmp.component.css']
})
export class HomeCmpComponent implements OnInit {

  // games: Array<Game> = [];
  gameTips = [];
  dateArray = [];
  gameResults = [];
  gameDisplayResults = [];
  gameUpcoming = [];
  gameDates: Set<string>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.games();
  }

  games() {
    this.dataService.getGameData('2019').then((data: any) => {
      console.log('data--->> ', data.games);
      let games = data.games;

      for(let index in games){
        const game = games[index];

        const gameDate = Date.parse(game.date);
        const today = new Date();

        // @ts-ignore
        if (gameDate <= today) {
          this.gameResults.push(game);
        } else {
          this.gameUpcoming.push(game);
        }

      }

      this.gameResults.sort(
        (a, b) => {
            return Date.parse(b.date) -  Date.parse(a.date);
        }
      );
    });
  }



}
