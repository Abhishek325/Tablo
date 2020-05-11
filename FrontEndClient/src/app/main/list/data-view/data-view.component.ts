import { Component, OnInit, Input } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { DataService } from 'src/app/services/schema/data.service';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  @Input() id: string;
  columns: string[] = [];
  dataSet: any[] = [];
  isLoading = true;

  constructor(private tableService: TableService, private dataService: DataService) { }

  refreshData() {
    this.tableService.getTableById(this.id).subscribe(res => {
      res['data'].forEach(f => {
        this.columns.push(f.name);
      });
    });
    this.dataService.getTableDataById(this.id).subscribe(res => {
      this.dataSet = Object.values(groupBy(res['data'], 'record_id'));
      this.isLoading = false;
    });
  }

  deleteRecord(recordId: number) {
    if (confirm('Are you sure?')) {
      this.dataService.deleteRecord(recordId).subscribe(res => {
        this.columns = [];
        this.refreshData();
      });
    }
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.refreshData();
    // Look for changes and get new data
    this.dataService.selectedTableTemplateId.subscribe(data => {
      this.id = data;
      this.columns = [];
      this.refreshData();
    });
  }
}
