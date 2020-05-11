import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/services/table/table.interface';
import { DataService } from 'src/app/services/schema/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isTableSelected = false;
  isViewTypeList = true;
  selectedTableId: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.selectedTableTemplateId.subscribe(data => {
      this.selectedTableId = data;
      this.isTableSelected = true;
    });
  }

}
