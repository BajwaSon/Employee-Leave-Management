export class LoginModel {
  emailId: string;
  password: string;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}

export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

export interface EmployeeModel {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
}

export interface DepartmentModel {
  deptId: number;
  deptName: string;
  deptHeadName: string;
  deptHeadEmpId: number;
  createdDate: string | null;
}

export class AddEmployeeModel {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.gender = '';
    this.role = '';
  }
}
