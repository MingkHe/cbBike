import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Station } from 'app/shared/model/station.model';
import { StationService } from './station.service';
import { StationComponent } from './station.component';
import { StationDetailComponent } from './station-detail.component';
import { StationUpdateComponent } from './station-update.component';
import { IStation } from 'app/shared/model/station.model';

@Injectable({ providedIn: 'root' })
export class StationResolve implements Resolve<IStation> {
  constructor(private service: StationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((station: HttpResponse<Station>) => station.body));
    }
    return of(new Station());
  }
}

export const stationRoute: Routes = [
  {
    path: '',
    component: StationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Stations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StationDetailComponent,
    resolve: {
      station: StationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Stations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StationUpdateComponent,
    resolve: {
      station: StationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Stations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StationUpdateComponent,
    resolve: {
      station: StationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Stations'
    },
    canActivate: [UserRouteAccessService]
  }
];
