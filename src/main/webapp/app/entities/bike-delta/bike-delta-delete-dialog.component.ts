import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBikeDelta } from 'app/shared/model/bike-delta.model';
import { BikeDeltaService } from './bike-delta.service';

@Component({
  templateUrl: './bike-delta-delete-dialog.component.html'
})
export class BikeDeltaDeleteDialogComponent {
  bikeDelta: IBikeDelta;

  constructor(protected bikeDeltaService: BikeDeltaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bikeDeltaService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'bikeDeltaListModification',
        content: 'Deleted an bikeDelta'
      });
      this.activeModal.dismiss(true);
    });
  }
}
