import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { CbPlusSharedModule } from 'app/shared/shared.module';
import { CbPlusCoreModule } from 'app/core/core.module';
import { CbPlusAppRoutingModule } from './app-routing.module';
import { CbPlusHomeModule } from './home/home.module';
import { CbPlusEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { MyMapComponent } from './my-map/my-map.component';

@NgModule({
  imports: [
    BrowserModule,
    CbPlusSharedModule,
    CbPlusCoreModule,
    CbPlusHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CbPlusEntityModule,
    CbPlusAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, MyMapComponent],
  bootstrap: [JhiMainComponent]
})
export class CbPlusAppModule {}
