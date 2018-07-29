import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DropdownDirective],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    DropdownDirective
  ]
})
export class SharedModule { }
