import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbPlusTestModule } from '../../../test.module';
import { Mean_aggregationComponent } from 'app/entities/mean-aggregation/mean-aggregation.component';
import { Mean_aggregationService } from 'app/entities/mean-aggregation/mean-aggregation.service';
import { Mean_aggregation } from 'app/shared/model/mean-aggregation.model';

describe('Component Tests', () => {
  describe('Mean_aggregation Management Component', () => {
    let comp: Mean_aggregationComponent;
    let fixture: ComponentFixture<Mean_aggregationComponent>;
    let service: Mean_aggregationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Mean_aggregationComponent],
        providers: []
      })
        .overrideTemplate(Mean_aggregationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Mean_aggregationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Mean_aggregationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Mean_aggregation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mean_aggregations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
