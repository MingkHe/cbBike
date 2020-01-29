import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mean_aggregation } from 'app/shared/model/mean-aggregation.model';
import { Mean_aggregationService } from './mean-aggregation.service';
import { Mean_aggregationComponent } from './mean-aggregation.component';
import { Mean_aggregationDetailComponent } from './mean-aggregation-detail.component';
import { Mean_aggregationUpdateComponent } from './mean-aggregation-update.component';
import { IMean_aggregation } from 'app/shared/model/mean-aggregation.model';

@Injectable({ providedIn: 'root' })
export class Mean_aggregationResolve implements Resolve<IMean_aggregation> {
  constructor(private service: Mean_aggregationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMean_aggregation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((mean_aggregation: HttpResponse<Mean_aggregation>) => mean_aggregation.body));
    }
    return of(new Mean_aggregation());
  }
}

export const mean_aggregationRoute: Routes = [
  {
    path: '',
    component: Mean_aggregationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Mean_aggregations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Mean_aggregationDetailComponent,
    resolve: {
      mean_aggregation: Mean_aggregationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Mean_aggregations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Mean_aggregationUpdateComponent,
    resolve: {
      mean_aggregation: Mean_aggregationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Mean_aggregations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Mean_aggregationUpdateComponent,
    resolve: {
      mean_aggregation: Mean_aggregationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Mean_aggregations'
    },
    canActivate: [UserRouteAccessService]
  }
];
