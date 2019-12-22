import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CbPlusTestModule } from '../../../test.module';
import { StationComponent } from 'app/entities/station/station.component';
import { StationService } from 'app/entities/station/station.service';
import { Station } from 'app/shared/model/station.model';

describe('Component Tests', () => {
  describe('Station Management Component', () => {
    let comp: StationComponent;
    let fixture: ComponentFixture<StationComponent>;
    let service: StationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CbPlusTestModule],
        declarations: [StationComponent],
        providers: []
      })
        .overrideTemplate(StationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Station(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
