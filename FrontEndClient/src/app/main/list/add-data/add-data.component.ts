import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Table } from 'src/app/services/table/table.interface';
import { TableService } from 'src/app/services/table/table.service';
import { DataService } from 'src/app/services/schema/data.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  @Input() id: string;
  @Output() OnDataInserted: EventEmitter<boolean> = new EventEmitter();
  tableSchema: Table;
  isLoading = false;

  constructor(private tableService: TableService, private dataService: DataService) { }

  save() {
    const fields = [];
    this.tableSchema.fields.forEach(f => {
      fields.push({ id: f.id, value: f.value });
    });
    console.log(this.tableSchema.id, fields);
    this.isLoading = true;
    this.dataService.saveData(this.tableSchema.id, fields).subscribe(res => {
      this.OnDataInserted.emit();
    });
  }

  ngOnInit(): void {
    this.tableService.getTableById(this.id).subscribe(res => {
      this.tableSchema = {} as Table;
      this.tableSchema.id = parseInt(this.id, 10);
      this.tableSchema.fields = res['data'];
      this.tableSchema.fields.map(x => x.value = '');
      this.tableSchema.name = res['data'][0]['TableName'];
    });
    this.dataService.selectedTableTemplateId.subscribe(data => {
      this.tableService.getTableById(data.toString()).subscribe(res => {
        this.tableSchema = {} as Table;
        this.tableSchema.id = data;
        this.tableSchema.fields = res['data'];
        this.tableSchema.fields.map(x => x.value = '');
        this.tableSchema.name = res['data'][0]['TableName'];
      });
    });
  }

}
