import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'jhi-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss']
})
// export class MyMapComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
export class MyMapComponent implements AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'Hello World!'
  });


  coordinates1 = new google.maps.LatLng(40.70463334, -74.01361706);
  marker1 = new google.maps.Marker({
    position: this.coordinates1,
    map: this.map,
    title: 'Broadway & Battery Pl'
  });

  coordinates2 = new google.maps.LatLng(40.75510267, -73.97498696);
  marker2 = new google.maps.Marker({
    position: this.coordinates2,
    map: this.map,
    title: 'E 47 St & Park Ave'
  });

  coordinates3 = new google.maps.LatLng(40.75828065, -73.97069431);
  marker3 = new google.maps.Marker({
    position: this.coordinates3,
    map: this.map,
    title: 'E 53 St & Lexington Ave'
  });




  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
    this.marker1.setMap(this.map);
    this.marker2.setMap(this.map);
    this.marker3.setMap(this.map);
  }
}
