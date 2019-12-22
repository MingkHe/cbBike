import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CbPlusTestModule } from '../../../test.module';
import { BikeDeltaUpdateComponent } from 'app/entities/bike-delta/bike-delta-update.component';
import { BikeDeltaService } from 'app/entities/bike-delta/bike-delta.service';
import { BikeDelta } from 'app/shared/model/bike-delta.model';

describe('Component Tests', () => {
  describe('BikeDelta Management Update Component', () => {
    let comp: BikeDeltaUpdateComponent;
    let fixture: ComponentFixture<BikeDeltaUpdateComponent>;
    let service: BikeDeltaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [BikeDeltaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BikeDeltaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BikeDeltaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BikeDeltaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BikeDelta(123);
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
        const entity = new BikeDelta();
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
