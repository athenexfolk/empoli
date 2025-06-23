import { Routes, type ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveTypeManager } from './leave-type-manager/leave-type-manager';
import { AddLeaveType } from './add-leave-type/add-leave-type';
import { UpdateLeaveType } from './update-leave-type/update-leave-type';
import { LeaveTypeStore } from '../../core/stores/leave-type.store';

export const routes: Routes = [
    {
        path: '',
        component: LeaveTypeManager,
    },
    {
        path: 'add',
        component: AddLeaveType,
    },
    {
        path: 'update/:leaveTypeId',
        component: UpdateLeaveType,
        resolve: {
            leaveType: (route: ActivatedRouteSnapshot) => {
                const leaveTypeStore = inject(LeaveTypeStore);
                const router = inject(Router);
                const leaveTypeId = route.paramMap.get('leaveTypeId');
                if (!leaveTypeId) {
                    router.navigate(['/not-found']);
                }
                const leaveType = leaveTypeStore
                    .items()
                    .find((e) => e.id === leaveTypeId);
                if (!leaveType) {
                    router.navigate(['/not-found']);
                }
                return leaveType;
            },
        },
    },
];
