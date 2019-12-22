import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CbPlusTestModule } from '../../../test.module';
import { BikeDeltaDeleteDialogComponent } from 'app/entities/bike-delta/bike-delta-delete-dialog.component';
import { BikeDeltaService } from 'app/entities/bike-delta/bike-delta.service';

describe('Component Tests', () => {
  describe('BikeDelta Management Delete Component', () => {
    let comp: BikeDeltaDeleteDialogComponent;
    let fixture: ComponentFixture<BikeDeltaDeleteDialogComponent>;
    let service: BikeDeltaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [BikeDeltaDeleteDialogComponent]
      })
        .overrideTemplate(BikeDeltaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BikeDeltaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BikeDeltaService);
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
