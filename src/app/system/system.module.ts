import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModules } from './system-routing.modules';
import { SystemComponent } from './pages/system/system.component';
import { BillComponent } from './pages/bill/bill.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { RecordsComponent } from './pages/records/records.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModules
  ],
  declarations: [
    SystemComponent,
    BillComponent,
    HistoryComponent,
    PlanningComponent,
    RecordsComponent,
    SidebarComponent
   ]
})
export class SystemModule { }
