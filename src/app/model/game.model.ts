// The Game class represents the game detail of a AFL match
export class Game {

  constructor(
    public complete: number,
    public is_grand_final: number,
    public tz:string,
    public hbehinds: number,
    public ateam: string,
    public winnerteamid: number,
    public hgoals: number,
    public updated: string,
    public round: number,
    public is_final: number,
    public hscore: number,
    public abehinds: number,
    public winner: string,
    public ascore: number,
    public hteam: string,
    public ateamid: number,
    public venue: string,
    public hteamid: number,
    public agoals: number,
    public year: number,
    public date: string,
    public id: number


  ){}

}
