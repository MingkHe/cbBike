import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CbPlusTestModule } from '../../../test.module';
import { Station_informationUpdateComponent } from 'app/entities/station-information/station-information-update.component';
import { Station_informationService } from 'app/entities/station-information/station-information.service';
import { Station_information } from 'app/shared/model/station-information.model';

describe('Component Tests', () => {
  describe('Station_information Management Update Component', () => {
    let comp: Station_informationUpdateComponent;
    let fixture: ComponentFixture<Station_informationUpdateComponent>;
    let service: Station_informationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Station_informationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Station_informationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Station_informationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Station_informationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Station_information(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Station_information();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
