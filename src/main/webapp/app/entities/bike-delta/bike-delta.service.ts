import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBikeDelta } from 'app/shared/model/bike-delta.model';

type EntityResponseType = HttpResponse<IBikeDelta>;
type EntityArrayResponseType = HttpResponse<IBikeDelta[]>;

@Injectable({ providedIn: 'root' })
export class BikeDeltaService {
  public resourceUrl = SERVER_API_URL + 'api/bike-deltas';

  constructor(protected http: HttpClient) {}

  create(bikeDelta: IBikeDelta): Observable<EntityResponseType> {
    return this.http.post<IBikeDelta>(this.resourceUrl, bikeDelta, { observe: 'response' });
  }

  update(bikeDelta: IBikeDelta): Observable<EntityResponseType> {
    return this.http.put<IBikeDelta>(this.resourceUrl, bikeDelta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBikeDelta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBikeDelta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
