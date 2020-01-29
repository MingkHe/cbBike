import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CbPlusTestModule } from '../../../test.module';
import { Mean_aggregationUpdateComponent } from 'app/entities/mean-aggregation/mean-aggregation-update.component';
import { Mean_aggregationService } from 'app/entities/mean-aggregation/mean-aggregation.service';
import { Mean_aggregation } from 'app/shared/model/mean-aggregation.model';

describe('Component Tests', () => {
  describe('Mean_aggregation Management Update Component', () => {
    let comp: Mean_aggregationUpdateComponent;
    let fixture: ComponentFixture<Mean_aggregationUpdateComponent>;
    let service: Mean_aggregationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Mean_aggregationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Mean_aggregationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Mean_aggregationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Mean_aggregationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Mean_aggregation(123);
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
        const entity = new Mean_aggregation();
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
