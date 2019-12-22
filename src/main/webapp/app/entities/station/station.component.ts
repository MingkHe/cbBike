import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStation } from 'app/shared/model/station.model';
import { StationService } from './station.service';
import { StationDeleteDialogComponent } from './station-delete-dialog.component';

@Component({
  selector: 'jhi-station',
  templateUrl: './station.component.html'
})
export class StationComponent implements OnInit, OnDestroy {
  stations: IStation[];
  eventSubscriber: Subscription;

  constructor(protected stationService: StationService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.stationService.query().subscribe((res: HttpResponse<IStation[]>) => {
      this.stations = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStation) {
    return item.id;
  }

  registerChangeInStations() {
    this.eventSubscriber = this.eventManager.subscribe('stationListModification', () => this.loadAll());
  }

  delete(station: IStation) {
    const modalRef = this.modalService.open(StationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.station = station;
  }
}
