import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMean_aggregation } from 'app/shared/model/mean-aggregation.model';
import { Mean_aggregationService } from './mean-aggregation.service';

@Component({
  templateUrl: './mean-aggregation-delete-dialog.component.html'
})
export class Mean_aggregationDeleteDialogComponent {
  mean_aggregation: IMean_aggregation;

  constructor(
    protected mean_aggregationService: Mean_aggregationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mean_aggregationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'mean_aggregationListModification',
        content: 'Deleted an mean_aggregation'
      });
      this.activeModal.dismiss(true);
    });
  }
}
