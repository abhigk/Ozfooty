import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {



  config = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,

  };
  options = [];
  myTeamSelect: any = [];
  rivalTeamSelect: any = [];

  gameResults: any = [];
  upcomingResults: any = [];

  teamOne;
  winCount = 0;
  winPercentage;
  teamTwo;

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.getDropdownTeamInfo();
  }

  getDropdownTeamInfo() {
    this.dataService.getTeam().then((data: any) => {
      this.options = data.teams;
    });
  }

  myChange(e) {
    console.log('EVENT->' , e.value);
    this.teamOne = e.value;
  }

  myChangeTwo(e){
    this.teamTwo = e.value;
  }

  headToHead() {

    this.gameResults = [];
    this.upcomingResults = [];

    let myteam = this.myTeamSelect.id;
    // let rivalTeam = this.rivalTeamSelect.id;

    this.dataService.getGameData('2019').then((data:any) => {

      const games = data.games;

      for (let index in games) {

        // filter with team index
        const game = games[index] ;

        if (game.ateamid == myteam || game.hteamid == myteam) {

          let gameDate = Date.parse(game.date);
          let today = new Date();

          // @ts-ignore
          if( gameDate <= today ) {
            this.gameResults.push(game);
            console.log('team one',this.teamOne);
            console.log('winner ',game.winner);

            if (this.teamOne.name == game.winner) {

              this.winCount++;
            }

          } else {
            this.upcomingResults.push(game);
          }

        }

      }

      this.winPercentage =  (this.winCount / this.gameResults.length) * 100;
      // console.log('win percent ', this.winPercentage);
      // console.log('win count', this.winCount);
      // console.log('game result', this.gameResults);
      console.log(this.gameResults);
      // this.gameResults.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    });

  }


}
