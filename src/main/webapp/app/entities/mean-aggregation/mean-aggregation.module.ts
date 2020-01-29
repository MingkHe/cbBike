import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CbPlusSharedModule } from 'app/shared/shared.module';
import { Mean_aggregationComponent } from './mean-aggregation.component';
import { Mean_aggregationDetailComponent } from './mean-aggregation-detail.component';
import { Mean_aggregationUpdateComponent } from './mean-aggregation-update.component';
import { Mean_aggregationDeleteDialogComponent } from './mean-aggregation-delete-dialog.component';
import { mean_aggregationRoute } from './mean-aggregation.route';

@NgModule({
  imports: [CbPlusSharedModule, RouterModule.forChild(mean_aggregationRoute)],
  declarations: [
    Mean_aggregationComponent,
    Mean_aggregationDetailComponent,
    Mean_aggregationUpdateComponent,
    Mean_aggregationDeleteDialogComponent
  ],
  entryComponents: [Mean_aggregationDeleteDialogComponent]
})
export class CbPlusMean_aggregationModule {}
