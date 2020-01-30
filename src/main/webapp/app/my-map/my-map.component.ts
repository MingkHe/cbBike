import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import TravelMode = google.maps.TravelMode;
import DirectionsRenderer = google.maps.DirectionsRenderer;

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

  totalTime = 0;
  totalDistance = 0;

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

    const infowindow = new google.maps.InfoWindow({
      content: 'Broadway & Battery Pl'
    });

    this.marker1.addListener('click', function(){
      infowindow.setContent(this.marker1.getTitle()+this.marker1.getPosition())
      infowindow.open(this.map, this.marker1);
    }.bind(this));

    const directionReqSer = new google.maps.DirectionsService();
    // const directionReq = new DirectionsReqBycicle(this.coordinates1, this.coordinates2);
    const directionReq = {
      origin: this.coordinates1,
      destination: this.coordinates2,
      travelMode: TravelMode.BICYCLING
    }

    const directionDisplay = new DirectionsRenderer();
    directionDisplay.setMap(this.map);
    directionReqSer.route(directionReq, function (result, status) {
      if(status === google.maps.DirectionsStatus.OK) {
          directionDisplay.setDirections(result);

        // for (let route of result.routes) {
        //   for (let leg of route.legs) {
        //     console.log(leg.distance)
        //     this.totalTime = leg.duration.string
        //     this.totalDistance = leg.distance.string
        //   }
        // }

        const leg = result.routes[0].legs[0]
        this.totalTime = leg.duration.text;
        this.totalDistance = leg.distance.text;

      }
    }.bind(this))

  }
}

// class DirectionsReqBycicle implements  DirectionsRequest {
//   travelModel: TravelMode;
//   origin: LatLng;
//   destination: LatLng;
//
//   constructor(start: LatLng, end: LatLng){
//     this.origin = start;
//     this.destination = end;
//     this.travelModel = TravelMode.BICYCLING;
//   }
//
// }

