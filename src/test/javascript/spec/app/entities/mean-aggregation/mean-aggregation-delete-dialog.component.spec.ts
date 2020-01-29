import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CbPlusTestModule } from '../../../test.module';
import { Mean_aggregationDeleteDialogComponent } from 'app/entities/mean-aggregation/mean-aggregation-delete-dialog.component';
import { Mean_aggregationService } from 'app/entities/mean-aggregation/mean-aggregation.service';

describe('Component Tests', () => {
  describe('Mean_aggregation Management Delete Component', () => {
    let comp: Mean_aggregationDeleteDialogComponent;
    let fixture: ComponentFixture<Mean_aggregationDeleteDialogComponent>;
    let service: Mean_aggregationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Mean_aggregationDeleteDialogComponent]
      })
        .overrideTemplate(Mean_aggregationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Mean_aggregationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Mean_aggregationService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
