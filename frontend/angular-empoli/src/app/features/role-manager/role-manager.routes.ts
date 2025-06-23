import { Routes } from '@angular/router';
import { RoleManager } from './role-manager/role-manager';
import { AddRole } from './add-role/add-role';

export const routes: Routes = [
    {
        path: '',
        component: RoleManager,
    },
    {
        path: 'add',
        component: AddRole,
    },
];
