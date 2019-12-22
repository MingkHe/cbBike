import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BikeDelta } from 'app/shared/model/bike-delta.model';
import { BikeDeltaService } from './bike-delta.service';
import { BikeDeltaComponent } from './bike-delta.component';
import { BikeDeltaDetailComponent } from './bike-delta-detail.component';
import { BikeDeltaUpdateComponent } from './bike-delta-update.component';
import { IBikeDelta } from 'app/shared/model/bike-delta.model';

@Injectable({ providedIn: 'root' })
export class BikeDeltaResolve implements Resolve<IBikeDelta> {
  constructor(private service: BikeDeltaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBikeDelta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((bikeDelta: HttpResponse<BikeDelta>) => bikeDelta.body));
    }
    return of(new BikeDelta());
  }
}

export const bikeDeltaRoute: Routes = [
  {
    path: '',
    component: BikeDeltaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BikeDeltas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BikeDeltaDetailComponent,
    resolve: {
      bikeDelta: BikeDeltaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BikeDeltas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BikeDeltaUpdateComponent,
    resolve: {
      bikeDelta: BikeDeltaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BikeDeltas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BikeDeltaUpdateComponent,
    resolve: {
      bikeDelta: BikeDeltaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BikeDeltas'
    },
    canActivate: [UserRouteAccessService]
  }
];
