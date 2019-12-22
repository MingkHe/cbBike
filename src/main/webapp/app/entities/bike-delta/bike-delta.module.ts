import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbPlusSharedModule } from 'app/shared/shared.module';
import { BikeDeltaComponent } from './bike-delta.component';
import { BikeDeltaDetailComponent } from './bike-delta-detail.component';
import { BikeDeltaUpdateComponent } from './bike-delta-update.component';
import { BikeDeltaDeleteDialogComponent } from './bike-delta-delete-dialog.component';
import { bikeDeltaRoute } from './bike-delta.route';

@NgModule({
  imports: [CbPlusSharedModule, RouterModule.forChild(bikeDeltaRoute)],
  declarations: [BikeDeltaComponent, BikeDeltaDetailComponent, BikeDeltaUpdateComponent, BikeDeltaDeleteDialogComponent],
  entryComponents: [BikeDeltaDeleteDialogComponent]
})
export class CbPlusBikeDeltaModule {}
