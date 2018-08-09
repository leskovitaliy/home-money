import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  declarations: [DropdownDirective],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    DropdownDirective,
    NgxChartsModule
  ]
})
export class SharedModule { }
