import {Injectable} from '@angular/core';
import {Station_informationService} from "app/entities/station-information/station-information.service";
import {IStation_information} from "app/shared/model/station-information.model";
import {HttpResponse} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import TravelMode = google.maps.TravelMode;
import DirectionsRenderer = google.maps.DirectionsRenderer;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  stations : IStation_information[] = [];
  loaded = false;
  coordinateToStationIndex = new Map<object, number>();

  constructor(
    private stationService: Station_informationService,
  ){}


  renderAllStations(map){
    this.getStations().subscribe(()=>{
        this.renderStations(map, this.stations);
    });
  }

  renderStations(map, stations: IStation_information[]){
    for (let station of stations){
      let coordinates = new google.maps.LatLng(station.lat, station.lon);
      this.createMarker(map, coordinates);
    }
  }

  createMarker(map, position){
    let marker = new google.maps.Marker({
      map: map,
      position: position
    });
    marker.setMap(map);

  }

  renderRoute(map, origin, destination, travelMode, color){
    const directionReqSer = new google.maps.DirectionsService();
    const directionReq = {
      origin: origin,
      destination: destination,
      travelMode: travelMode
    }

    const directionDisplay = new DirectionsRenderer({
      markerOptions: {
        icon: ""
      },
      polylineOptions: {
        strokeColor: color
      }
    });
    directionDisplay.setMap(map);
    directionReqSer.route(directionReq, function (result, status) {
      if(status === google.maps.DirectionsStatus.OK) {
          directionDisplay.setDirections(result);
      }
    })
  }

  renderPlace(map, place){
    let request = {
      query: place,
      fields: ['name', 'geometry'],
    };

    let service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(map, results[i].geometry.location);
        }
        map.setCenter(results[0].geometry.location);
      }
    }.bind(this));
  }

  findPlace(map, place) {
    return new Observable((observer)=>{
      let service = new google.maps.places.PlacesService(map);
      let request = {
        query: place,
        fields: ['name', 'geometry'],
      };

      service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          map.setCenter(results[0].geometry.location);
          observer.next((results[0].geometry.location));
          observer.complete();
        }
      });
    });
  }

  renderRouteBetweenTwoPlaces(map, place1, place2) {
    const observable = forkJoin({
      p1 : this.findPlace(map, place1),
      p2 : this.findPlace(map, place2)
    });

    observable.subscribe(
      (data) => {
        console.log(typeof(data));
        this.renderRoute(map, data.p1, data.p2, TravelMode.WALKING, 'blue');
      }
    );
  }

  // getDistanceMatrix(originLoc, stationsLoc) {
  //   this.getStations().pipe(
  //
  //   )
  //   let service = new google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //     {
  //       origins: [],
  //       destinations: [],
  //       travelMode: TravelMode.WALKING,
  //       avoidHighways: true,
  //       avoidTolls: true,
  //     }, callback);
  //
  //   function callback(response, status) {
  //     if (status === 'OK') {
  //       let origins = response.originAddresses;
  //       let destinations = response.destinationAddresses;
  //
  //       for (let i = 0; i < origins.length; i++) {
  //         let results = response.rows[i].elements;
  //         for (let j = 0; j < results.length; j++) {
  //           let element = results[j];
  //           let distance = element.distance.text;
  //           let duration = element.duration.text;
  //           let from = origins[i];
  //           let to = destinations[j];
  //         }
  //       }
  //     }
  //   }
  // }

  getNearbyStations() {
    return new Observable((observer) => {
      this.getStations().subscribe(()=>{
        let station = this.stations[this.getRandomInt(0, 10)];
        observer.next(new google.maps.LatLng(station.lat, station.lon));
        observer.complete();
      });
    })
  }

  stationsToCoordinates() {

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  getStations() {
    return new Observable((observer) => {
      if (this.loaded) {
        observer.next('loaded!');
        observer.complete();
      }
      this.stationService.query().subscribe((res: HttpResponse<IStation_information[]>) => {
        this.stations = res.body;
        this.loaded = true;
        observer.next('download!');
        observer.complete();
      });

    });
  }

  getRoutesBetweenTwoSearchPlace(map, place1, place2) {
    let observable = forkJoin({
      p1 : this.findPlace(map, place1),
      p2 : this.findPlace(map, place2),
      d1: this.getNearbyStations(),
      d2: this.getNearbyStations(),
    });

    observable.subscribe(
      (data) => {
        console.log(data.d1);
        this.renderRoute(map, data.p1, data.d1, TravelMode.WALKING,'blue');
        this.renderRoute(map, data.d1, data.d2, TravelMode.BICYCLING,'yellow');
        this.renderRoute(map, data.d2, data.p2, TravelMode.WALKING,'blue');
        // this.renderRoute(map, data.p1, data.p2, TravelMode.BICYCLING);
      }
    );
  }

}
