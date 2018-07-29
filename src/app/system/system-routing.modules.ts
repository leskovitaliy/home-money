import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemComponent } from './pages/system/system.component';

const routes = [
  {
    path: 'system',
    component: SystemComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModules {}
