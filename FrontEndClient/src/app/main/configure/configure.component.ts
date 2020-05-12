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
  searchTerm = '';
  searchResults: Table[] = [];

  constructor(private tableService: TableService) { }

  onSearch() {
    this.tableService.searchTerm = this.searchTerm;
    if (!this.searchTerm) {
      this.searchResults = [];
    } else {
      this.searchResults = this.tableList.filter(x => x.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    }
  }

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(res => {
      this.tableList = res['data'];
      this.searchTerm = this.tableService.searchTerm;
      if (this.searchTerm) {
        this.onSearch();
      }
      this.isLoading = false;
    });
  }
}
