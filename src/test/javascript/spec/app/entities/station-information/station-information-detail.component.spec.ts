import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CbPlusTestModule } from '../../../test.module';
import { Station_informationDetailComponent } from 'app/entities/station-information/station-information-detail.component';
import { Station_information } from 'app/shared/model/station-information.model';

describe('Component Tests', () => {
  describe('Station_information Management Detail Component', () => {
    let comp: Station_informationDetailComponent;
    let fixture: ComponentFixture<Station_informationDetailComponent>;
    const route = ({ data: of({ station_information: new Station_information(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Station_informationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Station_informationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Station_informationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.station_information).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
