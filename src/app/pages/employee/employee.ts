import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from './../../services/employee';
import {
  AddEmployeeModel,
  APIResponseModel,
  DepartmentModel,
  EmployeeModel,
} from '../../model/Employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonTable } from '../../reusable/common-table/common-table';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, CommonTable],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);

  employeeList: EmployeeModel[] = [];
  departmentList: DepartmentModel[] = [];
  roleList: string[] = [];

  employeeObj: AddEmployeeModel = new AddEmployeeModel();

  tableHeadList: string[] = ['ID', 'NAME', 'EMAIL', 'CONTACT', 'DEPARTMENT', 'ROLE', 'ACTION'];
  tableKeyList: string[] = ['employeeName', 'emailId', 'contactNo', 'deptName', 'role', ''];

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartment();
    this.getAllRoles();
  }

  getAllEmployees() {
    this.employeeService.getEmployeeList().subscribe({
      next: (response: APIResponseModel) => {
        this.employeeList = response.data;
      },
      error: (error: any) => {},
    });
  }

  getAllDepartment() {
    this.employeeService.getDepartmentList().subscribe({
      next: (res: DepartmentModel[]) => {
        this.departmentList = res;
      },
      error: (error: any) => {},
    });
  }

  getAllRoles() {
    this.employeeService.getRoleList().subscribe({
      next: (res) => {
        this.roleList = res.data;
      },
      error: (error: any) => {},
    });
  }

  onAddEmployee() {
    this.employeeService.onAddNewEmployee(this.employeeObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.getAllEmployees();
          alert('Employee added successfully.');
          this.getAllEmployees();
        } else {
          alert(res.message);
        }
      },
      error: (error: any) => {},
    });
  }
}
