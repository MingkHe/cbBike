export interface IStation_information {
  id?: number;
  station_id?: number;
  external_id?: string;
  name?: string;
  short_name?: number;
  lat?: number;
  lon?: number;
  region_id?: number;
  rental_methods_0?: string;
  rental_methods_1?: string;
  capacity?: number;
  rental_url?: string;
  electric_bike_surcharge_waiver?: string;
  eightd_has_key_dispenser?: string;
}

export class Station_information implements IStation_information {
  constructor(
    public id?: number,
    public station_id?: number,
    public external_id?: string,
    public name?: string,
    public short_name?: number,
    public lat?: number,
    public lon?: number,
    public region_id?: number,
    public rental_methods_0?: string,
    public rental_methods_1?: string,
    public capacity?: number,
    public rental_url?: string,
    public electric_bike_surcharge_waiver?: string,
    public eightd_has_key_dispenser?: string
  ) {}
}
