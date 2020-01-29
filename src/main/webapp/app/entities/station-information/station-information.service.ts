import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStation_information } from 'app/shared/model/station-information.model';

type EntityResponseType = HttpResponse<IStation_information>;
type EntityArrayResponseType = HttpResponse<IStation_information[]>;

@Injectable({ providedIn: 'root' })
export class Station_informationService {
  public resourceUrl = SERVER_API_URL + 'api/station-informations';

  constructor(protected http: HttpClient) {}

  create(station_information: IStation_information): Observable<EntityResponseType> {
    return this.http.post<IStation_information>(this.resourceUrl, station_information, { observe: 'response' });
  }

  update(station_information: IStation_information): Observable<EntityResponseType> {
    return this.http.put<IStation_information>(this.resourceUrl, station_information, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStation_information>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStation_information[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
