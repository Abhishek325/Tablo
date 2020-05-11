import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from 'src/app/services/table/table.interface';
import { DataService } from 'src/app/services/schema/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tableList: Table[] = [];
  selected: number;
  isLoading = false;

  constructor(private tableService: TableService, private dataService: DataService) { }

  onSelect(id: number) {
    this.dataService.selectedTableTemplateId.emit(id);
    this.selected = id;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.tableService.getAllTables().subscribe(res => {
      this.tableList = res['data'];
      this.isLoading = false;
    });
  }

}
