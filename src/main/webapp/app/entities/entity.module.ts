import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'station-information',
        loadChildren: () => import('./station-information/station-information.module').then(m => m.CbPlusStation_informationModule)
      },
      {
        path: 'mean-aggregation',
        loadChildren: () => import('./mean-aggregation/mean-aggregation.module').then(m => m.CbPlusMean_aggregationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CbPlusEntityModule {}
