import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NbCheckboxModule } from '@nebular/theme';

const components = [
  TablesComponent
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    MatTableModule,
    NbCheckboxModule,
    MatCheckboxModule
  ],
  exports: [
    components
  ]
})
export class TablesModule { }
