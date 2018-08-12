import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  declarations: [DropdownDirective, LoaderComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    DropdownDirective,
    NgxChartsModule,
    LoaderComponent
  ]
})
export class SharedModule { }
