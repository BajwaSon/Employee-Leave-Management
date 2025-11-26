import { EmployeeService } from './../../services/employee';
import { Component, inject } from '@angular/core';
import { LoginModel } from '../../model/Employee.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginObj: LoginModel = new LoginModel();

  employeeService = inject(EmployeeService);
  router = inject(Router);

  onLogin() {
    this.employeeService.onLogin(this.loginObj).subscribe({
      next: (result: any) => {
        if (result.result) {
          alert('Login Successfully.');
          localStorage.setItem('leaveUser', JSON.stringify(result.data));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(result.message);
        }
      },
      error: () => {
        alert('API not found this user.');
      },
    });
  }
}
