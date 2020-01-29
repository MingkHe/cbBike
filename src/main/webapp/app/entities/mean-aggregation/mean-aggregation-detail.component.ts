import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMean_aggregation } from 'app/shared/model/mean-aggregation.model';

@Component({
  selector: 'jhi-mean-aggregation-detail',
  templateUrl: './mean-aggregation-detail.component.html'
})
export class Mean_aggregationDetailComponent implements OnInit {
  mean_aggregation: IMean_aggregation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mean_aggregation }) => {
      this.mean_aggregation = mean_aggregation;
    });
  }

  previousState() {
    window.history.back();
  }
}
