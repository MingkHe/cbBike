import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbPlusTestModule } from '../../../test.module';
import { Station_informationComponent } from 'app/entities/station-information/station-information.component';
import { Station_informationService } from 'app/entities/station-information/station-information.service';
import { Station_information } from 'app/shared/model/station-information.model';

describe('Component Tests', () => {
  describe('Station_information Management Component', () => {
    let comp: Station_informationComponent;
    let fixture: ComponentFixture<Station_informationComponent>;
    let service: Station_informationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [Station_informationComponent],
        providers: []
      })
        .overrideTemplate(Station_informationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Station_informationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Station_informationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Station_information(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.station_informations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
