import { Routes, type ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeManagerPage } from './employee-manager/employee-manager.page';
import { AddEmployee } from './add-employee/add-employee';
import { UpdateEmployee } from './update-employee/update-employee';
import { inject } from '@angular/core';
import { EmployeeStore } from '../../core/stores/employee.store';
import { Router } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: EmployeeManagerPage,
    },
    {
        path: 'add',
        component: AddEmployee,
    },
    {
        path: 'update/:employeeId',
        component: UpdateEmployee,
        resolve: {
            employee: (route: ActivatedRouteSnapshot) => {
                const employeeStore = inject(EmployeeStore);
                const router = inject(Router);
                const employeeId = route.paramMap.get('employeeId');
                if (!employeeId) {
                    router.navigate(['/not-found']);
                }
                const employee = employeeStore
                    .items()
                    .find((e) => e.id === employeeId);
                if (!employee) {
                    router.navigate(['/not-found']);
                }
                return employee;
            },
        },
    },
];
