import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';
import { Team } from '../model/team.model';
import { LadderItem } from '../model/ladder-item.model';
import { Tip } from '../model/tip.model';

@Injectable()

export class DataService {
  // AFL stadiums and their locations; used to find nearest stadium to the user
  stadiums = {
    'Adelaide Oval': { lat: -34.915754, long: 138.596168 }
    , 'Bellerive Oval': { lat: -42.877208, long: 147.373511 }
    , 'Carrara': { lat: -28.006634, long: 153.366733 }
    , 'Eureka': { lat: -37.539436, long: 143.848362 }
    , 'Gabba': { lat: -27.486301, long: 153.038093 }
    , 'Jiangwan': { lat: 31.307411, long: 121.518367 }
    , 'Kardinia Park': { lat: -38.158364, long: 144.354239 }
    , 'M.C.G.': { lat: -37.820263, long: 144.983052 }
    , 'Manuka Oval': { lat: -35.318317, long: 149.134533 }
    , 'Marrara Oval': { lat: -12.398346, long: 130.88681 }
    , 'Marvel Stadium': { lat: -37.816226, long: 144.946894 }
    , 'Perth': { lat: -31.95128, long: 115.888671 }
    , 'Riverway': { lat: -19.317558, long: 146.731451 }
    , 'S.C.G.': { lat: -33.892066, long: 151.224583 }
    , 'Sydney Showground': { lat: -33.845694, long: 151.067693 }
    , 'Traeger Park': { lat: -23.709068, long: 133.874965 }
    , 'York Park': { lat: -41.426117, long: 147.138717 }

  };

  matches = []; // store matches here
  teams: Array<Team> = []; // teams of the afl
  // URLs to get data from squibble api
  gameURL = 'https://api.squiggle.com.au/?q=games;year=';
  teamURL = 'https://api.squiggle.com.au/?q=teams';
  newsUrl = 'https://newsapi.org/v2/top-headlines?country=au&category=sports&apiKey=bfcd98dce90244bd8d79b0e7f3b50511&q=afl';
  headlines: string[];
  ladderData: Array<LadderItem> = [];
  gamesByRoundAndYear: Array<Game> = [];
  gamesFixtures: Array<Game> = [];
  gameTip: Array<Tip> = [];

  constructor(private httpService: HttpClient) { }
  // Methods to find nearest stadium to a user

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  getLatLonFromPostCode(postcode) {
    const promise = new Promise(
      (resolve) => {
        this.httpService.get(`http://open.mapquestapi.com/geocoding/v1/address?key=EBdkGW6MirT15ArDr8bw3Tp0Umv8dJmA&maxResults=1&location=${postcode},australia`).subscribe(
          (data: any) => {
            resolve(data.results[0].locations[0].displayLatLng);
          }
        );
      }
    );
    return promise;
  }
  getGamesNearStadium(stadium) {
    const gamesURL = `https://api.squiggle.com.au/?q=games;complete=0`;

    const promise = new Promise(

      (resolve) => {
        this.httpService.get(gamesURL).subscribe(
          (data: any) => {
            const games = [];
            for (const index in data.games) {

              if (data.games[index].venue === stadium) {

                games.push(data.games[index]);

              }
            }
            resolve(games);
          }
        );
      }
    );
    return promise;

  }


  getNearestStadiums(lat, lng) {
    let minDistance = Number.MAX_VALUE;
    let nearestStadium = '';
    for (const i in this.stadiums) {
      // console.log(this.stadiums[i].lat, this.stadiums[i].long);
      const distance = this.getDistanceFromLatLonInKm(lat, lng, this.stadiums[i].lat, this.stadiums[i].long);

      if (distance < minDistance) {
        minDistance = distance;
        nearestStadium = i;

      }
    }
    return nearestStadium;

  }
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in KM
    return d;
  }

  // Get top news from the api

  getNews() {
    const promise = new Promise(
      (resolve) => {
        this.httpService.get(this.newsUrl).subscribe(
          (data: any) => {
            const news = [];
            const articles = data.articles;
            // tslint:disable-next-line: forin
            for (const index in articles) {

              news.push(articles[index].title);
            }
            resolve(news);
          }
        );
      }
    );
    return promise;
  }


  getGameData(year) {


    const promise = new Promise((resolve) => {
      if (Array.isArray(this.matches) && this.matches.length) {
        resolve(this.matches);
      } else {
        this.httpService.get(this.gameURL + year).subscribe(
          (data) => {
            resolve(data);
          }
        );
      }
    });
    return promise;
  }


  getCurrentRound() {
    const roundUrl = 'https://api.squiggle.com.au/?q=games;year=2019;complete=0';
    const promise = new Promise(
      (resolve) => {
        this.httpService.get(roundUrl).subscribe((data: any) => {
          // console.log('Current ROund ->',data.games[0].round);

          resolve(data.games[0].round);
        });
      }
    );
    return promise;
  }

  getGamesByRoundYear(year, round) {
    const gamesURL = `https://api.squiggle.com.au/?q=games;year=${year};complete=100`;
    console.log(gamesURL);
    const promise = new Promise(
      (resolve) => {

        if (this.gamesByRoundAndYear.length > 0) {
          resolve(this.gamesByRoundAndYear);
        } else {
          this.httpService.get(gamesURL).subscribe(
            (data: any) => {
              const gameData = data.games;
              for (const index in gameData) {
                const game = gameData[index];
                const gameNew = new Game(
                  +game.complete,
                  +game.is_grand_final,
                  game.tz,
                  +game.hbehinds,
                  game.ateam,
                  +game.winnerteamid,
                  +game.hgoals,
                  game.updated,
                  +game.round,
                  +game.is_final,
                  +game.hscore,
                  +game.abehinds,
                  game.winner,
                  +game.ascore,
                  game.hteam,
                  game.ateamid,
                  game.venue,
                  +game.hteamid,
                  +game.agoals,
                  +game.year,
                  game.date,
                  +game.id
                );
                this.gamesByRoundAndYear.push(gameNew);
              }
              resolve(this.gamesByRoundAndYear);
            }
          );
        }
      });
    return promise;
  }

  // getGameAndTips(year) {
  //
  //   const promise = new Promise((resolve) => {
  //     if (Array.isArray(this.matches) && this.matches.length) {
  //       resolve(this.matches);
  //     } else {
  //       this.httpService.get(this.gameURL + year).subscribe(
  //         (data: any) => {
  //           const gameData = data.games;
  //           for (const index in gameData) {
  //             const game = gameData[index];
  //             const gameNew = new Game(
  //               +game.complete,
  //               +game.is_grand_final,
  //               game.tz,
  //               +game.hbehinds,
  //               game.ateam,
  //               +game.winnerteamid,
  //               +game.hgoals,
  //               game.updated,
  //               +game.round,
  //               +game.is_final,
  //               +game.hscore,
  //               +game.abehinds,
  //               game.winner,
  //               +game.ascore,
  //               game.hteam,
  //               game.ateamid,
  //               game.venue,
  //               +game.hteamid,
  //               +game.agoals,
  //               +game.year,
  //               game.date,
  //               +game.id
  //             );
  //             this.gamesByRoundAndYear.push(gameNew);
  //           }
  //           resolve(this.gamesByRoundAndYear);
  //         }
  //       );
  //     }
  //   });
  //   return promise;
  // }

  getGamesFixtures(year, round) {
    const gamesURL = `https://api.squiggle.com.au/?q=games;year=${year};round=${round}`;
    console.log(gamesURL);
    const promise = new Promise(
      (resolve) => {

        this.httpService.get(gamesURL).subscribe(
          (data: any) => {
            const gameData = data.games;
            for (const index in gameData) {
              const game = gameData[index];


              const gameNew = new Game(
                +game.complete,
                +game.is_grand_final,
                game.tz,
                +game.hbehinds,
                game.ateam,
                +game.winnerteamid,
                +game.hgoals,
                game.updated,
                +game.round,
                +game.is_final,
                +game.hscore,
                +game.abehinds,
                game.winner,
                +game.ascore,
                game.hteam,
                game.ateamid,
                game.venue,
                +game.hteamid,
                +game.agoals,
                +game.year,
                game.date,
                +game.id
              );
              this.gamesFixtures.push(gameNew);
            }
            resolve(this.gamesFixtures);
          }
        );
      }

    );
    return promise;
  }



  getLadder() {
    const ladderURL = 'https://api.squiggle.com.au/?q=ladder;source=1';
    const promise = new Promise(
      (resolve) => {
        console.log('ladder data length is ', this.ladderData.length);
        if (this.ladderData.length > 0) {
          console.log('found item in ladder data');
          resolve(this.ladderData);
        } else {
          console.log('not found items in ladder');

          this.httpService.get(ladderURL).subscribe(
            (data: any) => {
              const ladderData = data.ladder;
              // tslint:disable-next-line:prefer-const
              this.ladderData = [];
              for (const index in ladderData) {
                const item = ladderData[index];
                const tm = new LadderItem(
                  +item.year,
                  +item.round,
                  +item.rank,
                  +item.percentage,
                  item.source,
                  item.team,
                  Date.parse(item.updated)
                );
                this.ladderData.push(tm);
              }
              // sort ladderItem array
              this.ladderData.sort((a, b) => {
                return a.rank - b.rank;
              });
              resolve(this.ladderData);
            }

          );
        }
      }
    );
    return promise;
  }


  // return team as an array of string
  getTeam() {
    const promise = new Promise((resolve) => {
      if (this.teams.length && this.teams.length > 0) {

        resolve(this.teams);
      } else {

        this.httpService.get(this.teamURL).subscribe(
          (data) => {
            resolve(data);
          }
        );
      }
    });
    return promise;
  }

  getTippings() {
    const tipURL = 'https://api.squiggle.com.au/?q=tips;year=2019;source=8';

    const promise = new Promise(
      (resolve) => {

        this.httpService.get(tipURL).subscribe(
          (data: any) => {
            // console.log('TIP DATA -> ', data);
            resolve(data);
          }
        );
      }

    );
    return promise;
  }

  getTippingsByRound(round) {
    const tipURL = `https://api.squiggle.com.au/?q=tips;year=2019;source=8;round=${round}`;

    const promise = new Promise(
      (resolve) => {

        this.httpService.get(tipURL).subscribe(
          (data: any) => {
            // console.log('TIP DATA -> ', data);
            resolve(data);
          }
        );
      }

    );
    return promise;
  }

  // Get Top 10 players
  getTopPlayers() {
    const promise = new Promise(
      (resolve) => {
        this.httpService.get('http://ozfooty.herokuapp.com/getTopPlayers').subscribe(
          (data) => {
            resolve(data);
          }
        );
      }
    );
    return promise;
  }


}
