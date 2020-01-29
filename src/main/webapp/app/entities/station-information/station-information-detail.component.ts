import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStation_information } from 'app/shared/model/station-information.model';

@Component({
  selector: 'jhi-station-information-detail',
  templateUrl: './station-information-detail.component.html'
})
export class Station_informationDetailComponent implements OnInit {
  station_information: IStation_information;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ station_information }) => {
      this.station_information = station_information;
    });
  }

  previousState() {
    window.history.back();
  }
}
