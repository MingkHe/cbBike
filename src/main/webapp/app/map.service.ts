import { Injectable } from '@angular/core';
import {Station_informationService} from "app/entities/station-information/station-information.service";
import {IStation_information} from "app/shared/model/station-information.model";
import {HttpResponse} from "@angular/common/http";
import TravelMode = google.maps.TravelMode;
import DirectionsRenderer = google.maps.DirectionsRenderer;
import {forkJoin, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  stations : IStation_information[] = [];
  loaded = false;

  constructor(
    private stationService: Station_informationService,
  ){}


  renderAllStations(map){
    if (this.loaded) {
      this.renderStations(map, this.stations);
      return;
    }
    this.stationService.query().subscribe((res: HttpResponse<IStation_information[]>) => {
      this.stations = res.body;
      this.renderStations(map, this.stations);
      this.loaded = true;
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

  renderRoute(map, origin, destination){
    const directionReqSer = new google.maps.DirectionsService();
    const directionReq = {
      origin: origin,
      destination: destination,
      travelMode: TravelMode.BICYCLING
    }

    const directionDisplay = new DirectionsRenderer();
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
        this.renderRoute(map, data.p1, data.p2);
      }
    );
  }




}
