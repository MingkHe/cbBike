import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Station_information } from 'app/shared/model/station-information.model';
import { Station_informationService } from './station-information.service';
import { Station_informationComponent } from './station-information.component';
import { Station_informationDetailComponent } from './station-information-detail.component';
import { Station_informationUpdateComponent } from './station-information-update.component';
import { IStation_information } from 'app/shared/model/station-information.model';

@Injectable({ providedIn: 'root' })
export class Station_informationResolve implements Resolve<IStation_information> {
  constructor(private service: Station_informationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStation_information> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((station_information: HttpResponse<Station_information>) => station_information.body));
    }
    return of(new Station_information());
  }
}

export const station_informationRoute: Routes = [
  {
    path: '',
    component: Station_informationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Station_informations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Station_informationDetailComponent,
    resolve: {
      station_information: Station_informationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Station_informations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Station_informationUpdateComponent,
    resolve: {
      station_information: Station_informationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Station_informations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Station_informationUpdateComponent,
    resolve: {
      station_information: Station_informationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Station_informations'
    },
    canActivate: [UserRouteAccessService]
  }
];
