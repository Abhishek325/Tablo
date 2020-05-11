import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { Table, Field } from 'src/app/services/table/table.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  table: Table = {} as Table;
  isLoading = true;
  isSaving = false;
  newFields: Field[] = [];
  deletedFields: number[] = [];

  constructor(private tableService: TableService, private route: ActivatedRoute, private router: Router) { }

  addField() {
    if (!this.table.fields) {
      this.table.fields = [];
    }
    this.table.fields.push({ name: '' });
    this.newFields.push(this.table.fields[this.table.fields.length - 1]);
  }

  removeField(fieldId: number) {
    this.table.fields = this.table.fields.filter(f => f.id !== fieldId);
    if (fieldId) {
      this.deletedFields.push(fieldId);
    }
  }

  save() {
    // console.log(this.deletedFields);
    // console.log(this.newFields);
    if (this.deletedFields.length > 0 && !confirm('Few fields are deleted. This could cause data loss!\n Are you sure?')) {
      return;
    }
    this.isSaving = true;
    this.tableService.updateById(this.table, this.newFields, this.deletedFields).subscribe(x => {
      this.router.navigate(['/configure']);
    }, err => {
      console.log(err);
    });
  }

  delete() {
    if (confirm('Are you sure? ')) {
      this.tableService.deleteTable(this.table.id).subscribe(res => {
        this.router.navigate(['/configure']);
      }, err => {
        console.log(err);
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.table.id = parseInt(id, 10);
      this.tableService.getTableById(id).subscribe(res => {
        this.table.name = res['data'][0]['TableName'];
        if (res['data'][0]['id']) {
          this.table.fields = res['data'];
        }
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.router.navigate(['/404']);
      });
    });
  }

}
