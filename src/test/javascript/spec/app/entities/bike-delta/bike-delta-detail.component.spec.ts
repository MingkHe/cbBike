import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CbPlusTestModule } from '../../../test.module';
import { BikeDeltaDetailComponent } from 'app/entities/bike-delta/bike-delta-detail.component';
import { BikeDelta } from 'app/shared/model/bike-delta.model';

describe('Component Tests', () => {
  describe('BikeDelta Management Detail Component', () => {
    let comp: BikeDeltaDetailComponent;
    let fixture: ComponentFixture<BikeDeltaDetailComponent>;
    const route = ({ data: of({ bikeDelta: new BikeDelta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [BikeDeltaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BikeDeltaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BikeDeltaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bikeDelta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
