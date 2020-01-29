import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbPlusSharedModule } from 'app/shared/shared.module';
import { Station_informationComponent } from './station-information.component';
import { Station_informationDetailComponent } from './station-information-detail.component';
import { Station_informationUpdateComponent } from './station-information-update.component';
import { Station_informationDeleteDialogComponent } from './station-information-delete-dialog.component';
import { station_informationRoute } from './station-information.route';

@NgModule({
  imports: [CbPlusSharedModule, RouterModule.forChild(station_informationRoute)],
  declarations: [
    Station_informationComponent,
    Station_informationDetailComponent,
    Station_informationUpdateComponent,
    Station_informationDeleteDialogComponent
  ],
  entryComponents: [Station_informationDeleteDialogComponent]
})
export class CbPlusStation_informationModule {}
