import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'station',
        loadChildren: () => import('./station/station.module').then(m => m.CbPlusStationModule)
      },
      {
        path: 'bike-delta',
        loadChildren: () => import('./bike-delta/bike-delta.module').then(m => m.CbPlusBikeDeltaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CbPlusEntityModule {}
