import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBikeDelta } from 'app/shared/model/bike-delta.model';
import { BikeDeltaService } from './bike-delta.service';
import { BikeDeltaDeleteDialogComponent } from './bike-delta-delete-dialog.component';

@Component({
  selector: 'jhi-bike-delta',
  templateUrl: './bike-delta.component.html'
})
export class BikeDeltaComponent implements OnInit, OnDestroy {
  bikeDeltas: IBikeDelta[];
  eventSubscriber: Subscription;

  constructor(protected bikeDeltaService: BikeDeltaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.bikeDeltaService.query().subscribe((res: HttpResponse<IBikeDelta[]>) => {
      this.bikeDeltas = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBikeDeltas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBikeDelta) {
    return item.id;
  }

  registerChangeInBikeDeltas() {
    this.eventSubscriber = this.eventManager.subscribe('bikeDeltaListModification', () => this.loadAll());
  }

  delete(bikeDelta: IBikeDelta) {
    const modalRef = this.modalService.open(BikeDeltaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bikeDelta = bikeDelta;
  }
}
