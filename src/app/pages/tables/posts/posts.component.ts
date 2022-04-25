import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../@core/api/api.service';


@Component({
  selector: 'ngx-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements AfterViewInit {

  displayedColumns: string[] = ['select','doc_id', 'post_url', 'status', 'seller_name', 'location_text', 'created_at', 'screenshot', 'is_live', 'caption', 'post_id', 'seller_id', 'area_concesion_edenor'];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  loadData = false
  data: any = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api : ApiService) {
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    this.api.getPosts().subscribe( data => {
      this.loadData = true
      console.log(data)
      this.data = data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator
    }) 
  }

  ngAfterViewInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



}
