import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMean_aggregation } from 'app/shared/model/mean-aggregation.model';
import { Mean_aggregationService } from './mean-aggregation.service';
import { Mean_aggregationDeleteDialogComponent } from './mean-aggregation-delete-dialog.component';

@Component({
  selector: 'jhi-mean-aggregation',
  templateUrl: './mean-aggregation.component.html'
})
export class Mean_aggregationComponent implements OnInit, OnDestroy {
  mean_aggregations: IMean_aggregation[];
  eventSubscriber: Subscription;

  constructor(
    protected mean_aggregationService: Mean_aggregationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.mean_aggregationService.query().subscribe((res: HttpResponse<IMean_aggregation[]>) => {
      this.mean_aggregations = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInMean_aggregations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMean_aggregation) {
    return item.id;
  }

  registerChangeInMean_aggregations() {
    this.eventSubscriber = this.eventManager.subscribe('mean_aggregationListModification', () => this.loadAll());
  }

  delete(mean_aggregation: IMean_aggregation) {
    const modalRef = this.modalService.open(Mean_aggregationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mean_aggregation = mean_aggregation;
  }
}
