import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {formatDate} from '@angular/common';
import {Game} from '../model/game.model';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  weekday: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday' , 'Thursday' , 'Friday', 'Saturday'];
  monthNames: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  games: Array<Game> = [];
  gameResults = [];
  gameDates: Set<string>;
  sortedDateArray = [];
  hasSearched = false;
  currentR;


  yearOptions = ['2017', '2018', '2019'];
  yearConfig = {
    height: 'auto',
    placeholder: '2019', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
    // customComparator: ()=>{} // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };


   roundOptions = [];
  roundConfig = {
    height: '20vw',
    placeholder: 'Round', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
     customComparator: (a: number, b: number) => a - b, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };


  teamOptions = [];
  teamConfig = {
    displayKey: 'name', // if objects array passed which key to be displayed defaults to description
    search: true,
    height: '20vw',
    placeholder: 'Team', // text to be displayed when no item is selected defaults to Select,
    // tslint:disable-next-line:max-line-length
    customComparator: (a: number, b: number) => a - b, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // tslint:disable-next-line:max-line-length
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  myTeamSelect: any = [];

  roundSelect: any = [];
  ngOnInit() {
    // this.roundOptions.apply(null, {length: N}).map(Number.call, Number)
    this.currentRound().then(
      (currentR) => {
        this.roundOptions = [];
          this.setRounds(currentR);
      }
    );

    this.getDropdownTeamInfo();

  }

  setRounds(currentR) {
    for (let i = currentR; i <= 23; i++ ) {
      this.roundOptions.push(i);
    }
  }



  constructor(private dataService: DataService ) {
     this.gameDates = new Set();
  }

  currentRound() {
    const promise = new Promise(
      (resolve) => {
        this.dataService.getCurrentRound().then((data: any) => {
          this.currentR = data;
          console.log(this.currentR);
          resolve(data);
        });
      }
    );

    return promise;
  }

  getDropdownTeamInfo() {
    this.dataService.getTeam().then((data: any) => {
      // console.log('Team data-->>', data.teams);
      console.log('getting team options');
      this.teamOptions = data.teams;
    });
  }






getSortedDates() {
    const sortedDates = Array.from(this.gameDates).sort();
    return sortedDates;
}

generateGameAndDateArray(game) {

  // this.storeGameAndDate(game, game.date);
  const gameDate = Date.parse(game.date);
  const today = new Date();

  // @ts-ignore
  if (gameDate > today) {
    this.gameDates.add(game.date.slice(0, 10));
    this.gameResults.push(game);
  }
  console.log('gameResult', this.gameResults);
}

dataFilter(data) {
  const games = data.tips;

  for (let index in games){
    const game = games[index];

    if (this.myTeamSelect) {
      const myteam = this.myTeamSelect.id;

      if (game.ateamid == myteam || game.hteamid == myteam) {
        this.generateGameAndDateArray(game);
      }

    } else {
      this.generateGameAndDateArray(game);
    }

  }
  this.sortedDateArray = this.getSortedDates();
  this.hasSearched = true;
}

result() {

  this.gameResults = [];
  this.gameDates = new Set();
  this.sortedDateArray = [];

  if (this.roundSelect === undefined) {
    this.dataService.getTippings().then((data: any) => {
      this.dataFilter(data);
    });
  } else {
    this.dataService.getTippingsByRound(this.roundSelect).then((data: any) => {
      console.log('in round select');
      this.dataFilter(data);
    });
  }


}


}
