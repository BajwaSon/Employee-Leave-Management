import { EmployeeService } from './../../services/employee';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leaves',
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
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

  constructor() {
    const loggedData = localStorage.getItem('leaveUser');
    if (loggedData != null) {
      const loggedParseData = JSON.parse(loggedData);
      this.leaveForm.controls['employeeId'].setValue(loggedParseData.employeeId);
    }
  }
  ngOnInit(): void {
    this.loadLeaves();
    this.changeTab('my_leaves');
    this.loadLeavesRequest();
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
      },
    });
  }

  onRejectLeave(id: number) {
    this.employeeService.getRejectLeave(id).subscribe({
      next: () => {
        this.loadLeavesRequest();
      },
    });
  }

  onleaveSubmit() {
    const formValue = this.leaveForm.value;
    this.employeeService.onAddLeave(formValue).subscribe({
      next: () => {
        this.loadLeaves();
      },
    });
  }

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
  }
}
