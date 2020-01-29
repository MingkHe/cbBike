import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CbPlusTestModule } from '../../../test.module';
import { Mean_aggregationDetailComponent } from 'app/entities/mean-aggregation/mean-aggregation-detail.component';
import { Mean_aggregation } from 'app/shared/model/mean-aggregation.model';

describe('Component Tests', () => {
  describe('Mean_aggregation Management Detail Component', () => {
    let comp: Mean_aggregationDetailComponent;
    let fixture: ComponentFixture<Mean_aggregationDetailComponent>;
    const route = ({ data: of({ mean_aggregation: new Mean_aggregation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Mean_aggregationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Mean_aggregationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Mean_aggregationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mean_aggregation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
