import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NbButtonModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostsComponent } from './posts/posts.component';
import { GestionComponent } from './gestion/gestion.component';


const components = [
  TablesComponent,
  PostsComponent,
  GestionComponent
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    MatTableModule,
    NbCheckboxModule,
    MatCheckboxModule,
    MatTableExporterModule,
    NbButtonModule,
    MatPaginatorModule,
    NbCardModule
  ],
  exports: [
    components
  ]
})
export class TablesModule { }
