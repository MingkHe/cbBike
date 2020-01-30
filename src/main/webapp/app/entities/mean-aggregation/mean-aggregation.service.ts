import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMean_aggregation } from 'app/shared/model/mean-aggregation.model';

type EntityResponseType = HttpResponse<IMean_aggregation>;
type EntityArrayResponseType = HttpResponse<IMean_aggregation[]>;

@Injectable({ providedIn: 'root' })
export class Mean_aggregationService {
  public resourceUrl = SERVER_API_URL + 'api/mean-aggregations';

  constructor(protected http: HttpClient) {}

  create(mean_aggregation: IMean_aggregation): Observable<EntityResponseType> {
    return this.http.post<IMean_aggregation>(this.resourceUrl, mean_aggregation, { observe: 'response' });
  }

  update(mean_aggregation: IMean_aggregation): Observable<EntityResponseType> {
    return this.http.put<IMean_aggregation>(this.resourceUrl, mean_aggregation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMean_aggregation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findBySidAndMinuteAndWeekday(sid: number, minute: number, weekday: boolean): Observable<EntityResponseType> {
    return this.http.get<IMean_aggregation>(`${this.resourceUrl}/${sid}/${minute}/${weekday}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMean_aggregation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
