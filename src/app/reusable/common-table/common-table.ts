import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() viewEvent = new EventEmitter<any>();

  @Output() editEvent = new EventEmitter<any>();

  @Output() deleteEvent = new EventEmitter<any>();

  @Output() approveLeaveEvent = new EventEmitter<number>();

  @Output() rejectLeaveEvent = new EventEmitter<number>();

  onClickView(data: any) {
    this.viewEvent.emit(data);
  }

  onClickEdit(data: any) {
    this.editEvent.emit(data);
  }

  onClickDelete(data: any) {
    this.deleteEvent.emit(data);
  }

  onApproveLeave(id: number) {
    this.approveLeaveEvent.emit(id);
  }

  onRejectLeave(id: number) {
    this.rejectLeaveEvent.emit(id);
  }
}
