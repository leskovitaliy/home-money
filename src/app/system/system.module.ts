import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModules } from './system-routing.modules';
import { SystemComponent } from './pages/system/system.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModules
  ],
  declarations: [SystemComponent]
})
export class SystemModule { }
