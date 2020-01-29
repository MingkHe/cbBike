import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStation_information } from 'app/shared/model/station-information.model';
import { Station_informationService } from './station-information.service';
import { Station_informationDeleteDialogComponent } from './station-information-delete-dialog.component';

@Component({
  selector: 'jhi-station-information',
  templateUrl: './station-information.component.html'
})
export class Station_informationComponent implements OnInit, OnDestroy {
  station_informations: IStation_information[];
  eventSubscriber: Subscription;

  constructor(
    protected station_informationService: Station_informationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.station_informationService.query().subscribe((res: HttpResponse<IStation_information[]>) => {
      this.station_informations = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStation_informations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStation_information) {
    return item.id;
  }

  registerChangeInStation_informations() {
    this.eventSubscriber = this.eventManager.subscribe('station_informationListModification', () => this.loadAll());
  }

  delete(station_information: IStation_information) {
    const modalRef = this.modalService.open(Station_informationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.station_information = station_information;
  }
}
