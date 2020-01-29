import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { Station_informationService } from 'app/entities/station-information/station-information.service';
import { IStation_information, Station_information } from 'app/shared/model/station-information.model';

describe('Service Tests', () => {
  describe('Station_information Service', () => {
    let injector: TestBed;
    let service: Station_informationService;
    let httpMock: HttpTestingController;
    let elemDefault: IStation_information;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(Station_informationService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Station_information(
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Station_information', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new Station_information(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Station_information', () => {
        const returnedFromService = Object.assign(
          {
            station_id: 1,
            external_id: 'BBBBBB',
            name: 'BBBBBB',
            short_name: 1,
            lat: 1,
            lon: 1,
            region_id: 1,
            rental_methods_0: 'BBBBBB',
            rental_methods_1: 'BBBBBB',
            capacity: 1,
            rental_url: 'BBBBBB',
            electric_bike_surcharge_waiver: 'BBBBBB',
            eightd_has_key_dispenser: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Station_information', () => {
        const returnedFromService = Object.assign(
          {
            station_id: 1,
            external_id: 'BBBBBB',
            name: 'BBBBBB',
            short_name: 1,
            lat: 1,
            lon: 1,
            region_id: 1,
            rental_methods_0: 'BBBBBB',
            rental_methods_1: 'BBBBBB',
            capacity: 1,
            rental_url: 'BBBBBB',
            electric_bike_surcharge_waiver: 'BBBBBB',
            eightd_has_key_dispenser: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Station_information', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
