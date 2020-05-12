import { Injectable, Output, EventEmitter } from '@angular/core';
import { Table, Field } from './table.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TableService {

  @Output() addTableObserver: EventEmitter<any> = new EventEmitter();
  searchTerm = '';

  constructor(private httpClient: HttpClient) { }

  getAllTables() {
    return this.httpClient.get<Table[]>('/table/list');
  }

  getTableById(id: string) {
    return this.httpClient.get<Table>('/table/' + id);
  }

  addTable(table: Table) {
    return this.httpClient.post('/table/add', table);
  }

  updateById(table: Table, newFields: Field[], deletedFieldIds: number[]) {
    return this.httpClient.post('/table/update', { table, newFields, deletedFieldIds });
  }

  deleteTable(id: number) {
    return this.httpClient.post('/table/delete', { id });
  }

}
