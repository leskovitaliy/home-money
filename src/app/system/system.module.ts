import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BillService } from './services/bill.service';
import { CategoriesService } from './services/categories.service';
import { EventsService } from './services/events.service';
import { SystemRoutingModules } from './system-routing.modules';
import { SystemComponent } from './pages/system/system.component';
import { BillComponent } from './pages/bill/bill.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { RecordsComponent } from './pages/records/records.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BillCardComponent } from './components/bill-card/bill-card.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

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
    SidebarComponent,
    HeaderComponent,
    BillCardComponent,
    CurrencyCardComponent,
    CustomDatePipe,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent
   ],
  providers: [
    BillService,
    CategoriesService,
    EventsService
  ]
})
export class SystemModule { }
