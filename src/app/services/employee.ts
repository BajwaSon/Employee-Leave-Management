import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponseModel, DepartmentModel } from '../model/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  onLogin(obj: any) {
    return this.http.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login', obj);
  }

  getEmployeeList(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees'
    );
  }

  getDepartmentList(): Observable<DepartmentModel[]> {
    return this.http
      .get<any>('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments')
      .pipe(map((res) => res.data as DepartmentModel[]));
  }

  getRoleList(): Observable<{ data: string[] }> {
    return this.http.get<{ data: string[] }>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles'
    );
  }

  onAddNewEmployee(obj: any) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee',
      obj
    );
  }
}
