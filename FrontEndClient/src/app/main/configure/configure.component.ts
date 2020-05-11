import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from 'src/app/services/table/table.interface';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  tableList: Table[] = [];
  isLoading = true;

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(res => {
      this.tableList = res['data'];
      this.isLoading = false;
    });
  }
}
