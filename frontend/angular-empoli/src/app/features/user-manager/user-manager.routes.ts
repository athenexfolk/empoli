import { Routes } from '@angular/router';
import { UserManager } from './user-manager/user-manager';
import { AddUser } from './add-user/add-user';

export const routes: Routes = [
    {
        path: '',
        component: UserManager,
    },
    {
        path: 'add',
        component: AddUser,
    },
];
