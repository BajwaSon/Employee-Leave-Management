import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employee } from './pages/employee/employee';
import { Leaves } from './pages/leaves/leaves';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: Login,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'employees',
        component: Employee,
      },
      {
        path: 'leaves',
        component: Leaves,
      },
    ],
  },
];
