import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillComponent } from './pages/bill/bill.component';
import { HistoryDetailComponent } from './pages/history/components/history-detail/history-detail.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { RecordsComponent } from './pages/records/records.component';
import { SystemComponent } from './pages/system/system.component';

const routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: 'bill',
        component: BillComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'planning',
        component: PlanningComponent
      },
      {
        path: 'records',
        component: RecordsComponent
      },
      {
        path: 'history/:id',
        component: HistoryDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModules {}
