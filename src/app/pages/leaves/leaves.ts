import { EmployeeService } from './../../services/employee';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonTable } from '../../reusable/common-table/common-table';

@Component({
  selector: 'app-leaves',
  imports: [CommonModule, ReactiveFormsModule, CommonTable],
  templateUrl: './leaves.html',
  styleUrl: './leaves.scss',
})
export class Leaves implements OnInit {
  employeeService = inject(EmployeeService);

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null),
  });

  leaveList: any[] = [];
  approvalLeaveList: any[] = [];
  tableHeadList: string[] = [
    'LEAVE ID',
    'EMPLOYEE NAME',
    'LEAVE TYPE',
    'FROM DATE',
    'TO DATE',
    'STATUS',
    'ACTION',
  ];
  reqtableHeadList: string[] = [
    'LEAVE ID',
    'EMPLOYEE NAME',
    'LEAVE TYPE',
    'FROM DATE',
    'TO DATE',
    'DAYS',
    'ACTION',
  ];
  tableKeyList: string[] = ['employeeName', 'leaveType', 'fromDate', 'toDate', 'isApproved', ''];
  reqtableKeyList: string[] = [
    'employeeName',
    'leaveType',
    'fromDate',
    'toDate',
    'noOfDays',
    'leaveaction',
  ];

  constructor() {
    const loggedData = localStorage.getItem('leaveUser');
    if (loggedData != null) {
      const loggedParseData = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(loggedParseData.employeeId);
    }
  }
  ngOnInit(): void {
    this.loadLeaves();
    this.loadLeavesRequest();
    this.changeTab('my_leaves');
  }

  loadLeaves() {
    const empId = this.leaveForm.controls['employeeId'].value;
    this.employeeService.getAllLeavesByEmpId(empId).subscribe({
      next: (res: any) => {
        this.leaveList = res.data;
      },
    });
  }

  loadLeavesRequest() {
    this.employeeService.getAllLeaves().subscribe({
      next: (res: any) => {
        this.approvalLeaveList = res.data.filter((x: any) => x.isApproved == null);
      },
    });
  }

  onApproveLeave(id: number) {
    this.employeeService.getApprovedLeave(id).subscribe({
      next: () => {
        this.loadLeavesRequest();
        this.loadLeaves();
      },
    });
  }

  onRejectLeave(id: number) {
    this.employeeService.getRejectLeave(id).subscribe({
      next: () => {
        this.loadLeavesRequest();
        this.loadLeaves();
      },
    });
  }

  onleaveSubmit() {
    const formValue = this.leaveForm.value;
    this.employeeService.onAddLeave(formValue).subscribe({
      next: (res: any) => {
        this.loadLeaves();
        this.loadLeavesRequest();
        if (res.result == false) {
          alert(res.message);
        } else {
          alert('Leave applied successfully.');
        }
      },
      error: (error: any) => {
        alert('Something went wrong. Please try again later.');
      },
    });
  }

  selectedLeave: any; // store leave details

  onViewData(leave: any) {
    this.selectedLeave = leave;
    console.log('Leave details:', this.selectedLeave);
  }

  onEditData(data: any) {}

  onDeleteData(data: any) {}

  changeTab(tabName: string) {
    const tabs = document.querySelectorAll('#tabs button') as NodeListOf<HTMLButtonElement>;
    const contents = document.querySelectorAll('#tab-content > div');
    const indicator = document.querySelector('#indicator') as HTMLElement;

    const tabCount = tabs.length;
    const widthPercent = 100 / tabCount;

    tabs.forEach((tab, index) => {
      const isActive = tab.dataset['tab'] === tabName;
      if (isActive) {
        tab.classList.add('text-indigo-500');
        tab.classList.remove('text-gray-400');
        // Move indicator by percentage
        if (indicator) {
          indicator.style.width = widthPercent + '%';
          indicator.style.left = index * widthPercent + '%';
        }
      } else {
        tab.classList.remove('text-indigo-500');
        tab.classList.add('text-gray-400');
      }
    });

    contents.forEach((content) => {
      if (content.id === tabName) {
        content.classList.remove('hidden');
        content.classList.add('animate-fade');
      } else {
        content.classList.add('hidden');
        content.classList.remove('animate-fade');
      }
    });

    if (tabName === 'leave_request') {
      this.loadLeavesRequest();
    }

    if (tabName === 'my_leaves') {
      this.loadLeaves();
    }
  }
}
