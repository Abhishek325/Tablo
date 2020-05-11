import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.css']
})
export class TableCardComponent implements OnInit {

  @Input() name: string;
  @Input() fields: number;
  @Input() createdOn: string;

  constructor() { }

  ngOnInit(): void {
  }

}
