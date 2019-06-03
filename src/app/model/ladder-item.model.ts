// The ladder item class represents each item of the ladder table
export class LadderItem{
  played: number;
  won : number;
  lost: number;
  draw: number;
  form: [];

  constructor(
    public year: number,
    public round: number,
    public rank: number,
    public percentage: number,
    public source: string,
    public team: string,
    public updated: number,
  ) {
    this.form = [];
  }
}
