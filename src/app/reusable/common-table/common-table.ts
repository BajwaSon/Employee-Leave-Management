import { CommonModule, JsonPipe } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-common-table',
  imports: [CommonModule],
  templateUrl: './common-table.html',
  styleUrl: './common-table.scss',
})
export class CommonTable {
  @Input() tableHeadData: string[] = [];

  @Input() tableBodyRows: any[] = [];

  @Input() tableKeyList: string[] = [];
}
