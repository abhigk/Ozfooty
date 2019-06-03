export class Tip {

  constructor (
    public confidence: number,
    public bits: number,
    public gameid: number,
    public ateamid: number,
    public venue: string,
    public year: number,
    public correct: number,
    public date: string,
    public updated: string,
    public hteam: string,
    public tipteamid: number,
    public margin: number,
    public err: number,
    public tip: string,
    public ateam: string,
    public source: string,
    public sourceid: number,
    public hconfidence: number,
    public hteamid: number,
    public round: number
  ) {}
}
