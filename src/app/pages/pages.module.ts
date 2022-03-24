import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NbAuthModule } from '@nebular/auth';
import { NbPasswordAuthStrategy } from '@nebular/auth';
import { TablesModule } from './tables/tables.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    TablesModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
