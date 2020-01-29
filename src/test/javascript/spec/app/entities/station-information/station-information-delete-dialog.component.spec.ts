import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CbPlusTestModule } from '../../../test.module';
import { Station_informationDeleteDialogComponent } from 'app/entities/station-information/station-information-delete-dialog.component';
import { Station_informationService } from 'app/entities/station-information/station-information.service';

describe('Component Tests', () => {
  describe('Station_information Management Delete Component', () => {
    let comp: Station_informationDeleteDialogComponent;
    let fixture: ComponentFixture<Station_informationDeleteDialogComponent>;
    let service: Station_informationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Station_informationDeleteDialogComponent]
      })
        .overrideTemplate(Station_informationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Station_informationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Station_informationService);
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
