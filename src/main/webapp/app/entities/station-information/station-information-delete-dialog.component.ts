import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStation_information } from 'app/shared/model/station-information.model';
import { Station_informationService } from './station-information.service';

@Component({
  templateUrl: './station-information-delete-dialog.component.html'
})
export class Station_informationDeleteDialogComponent {
  station_information: IStation_information;

  constructor(
    protected station_informationService: Station_informationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.station_informationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'station_informationListModification',
        content: 'Deleted an station_information'
      });
      this.activeModal.dismiss(true);
    });
  }
}
