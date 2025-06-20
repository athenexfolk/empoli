import { Routes } from '@angular/router';
import { EmployeeManagerPage } from './employee-manager/employee-manager.page';
import { AddEmployee } from './add-employee/add-employee';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeManagerPage,
  },
  {
    path: 'add',
    component: AddEmployee,
  },
];
