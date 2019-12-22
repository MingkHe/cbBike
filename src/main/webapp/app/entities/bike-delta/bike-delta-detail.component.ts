import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBikeDelta } from 'app/shared/model/bike-delta.model';

@Component({
  selector: 'jhi-bike-delta-detail',
  templateUrl: './bike-delta-detail.component.html'
})
export class BikeDeltaDetailComponent implements OnInit {
  bikeDelta: IBikeDelta;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bikeDelta }) => {
      this.bikeDelta = bikeDelta;
    });
  }

  previousState() {
    window.history.back();
  }
}
