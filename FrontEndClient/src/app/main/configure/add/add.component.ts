import { Component } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { Table } from 'src/app/services/table/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  table: Table = {} as Table;
  isLoading = false;

  constructor(private tableService: TableService, private router: Router) { }

  addTable() {
    const isInputValid = this.isInputValidated();
    if (isInputValid) {
      this.isLoading = true;
      this.tableService.addTable(this.table).subscribe(() => {
        this.router.navigate(['/configure']);
      });
    }
  }

  addField() {
    if (!this.table.fields) {
      this.table.fields = [];
    }
    this.table.fields.push({ name: '' });
  }

  removeField(i: number) {
    this.table.fields.splice(i, 1);
  }

  isInputValidated() {
    if (!this.table.fields) {
      return true;
    }
    let valid = true;
    this.table.fields.forEach(f => {
      if (f.name === '') {
        alert('Field name is required')
        valid = valid && false;
      }
    });
    return valid;
  }

}
