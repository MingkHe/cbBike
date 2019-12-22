export interface IBikeDelta {
  id?: number;
  stationID?: number;
  minute?: number;
  weekday?: boolean;
  deltaValue?: number;
}

export class BikeDelta implements IBikeDelta {
  constructor(public id?: number, public stationID?: number, public minute?: number, public weekday?: boolean, public deltaValue?: number) {
    this.weekday = this.weekday || false;
  }
}
