import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbPlusTestModule } from '../../../test.module';
import { BikeDeltaComponent } from 'app/entities/bike-delta/bike-delta.component';
import { BikeDeltaService } from 'app/entities/bike-delta/bike-delta.service';
import { BikeDelta } from 'app/shared/model/bike-delta.model';

describe('Component Tests', () => {
  describe('BikeDelta Management Component', () => {
    let comp: BikeDeltaComponent;
    let fixture: ComponentFixture<BikeDeltaComponent>;
    let service: BikeDeltaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [BikeDeltaComponent],
        providers: []
      })
        .overrideTemplate(BikeDeltaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BikeDeltaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BikeDeltaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BikeDelta(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bikeDeltas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
