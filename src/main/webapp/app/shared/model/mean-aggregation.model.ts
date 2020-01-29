export interface IMean_aggregation {
  id?: number;
  stationID?: number;
  isWeekday?: boolean;
  minute?: number;
  delta?: number;
}

export class Mean_aggregation implements IMean_aggregation {
  constructor(public id?: number, public stationID?: number, public isWeekday?: boolean, public minute?: number, public delta?: number) {
    this.isWeekday = this.isWeekday || false;
  }
}
