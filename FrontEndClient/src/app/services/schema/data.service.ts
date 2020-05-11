import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {

  @Output() selectedTableTemplateId: EventEmitter<number> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  saveData(tableId: number, userData: any) {
    return this.httpClient.post('/data/add', { id: tableId, fields: userData });
  }

  getTableDataById(id: string) {
    return this.httpClient.get('/data/' + id);
  }

  deleteRecord(id: number) {
    return this.httpClient.post('/data/delete', { id });
  }

}
