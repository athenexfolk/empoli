import { inject, Injectable } from '@angular/core';
import { UserStore } from '../stores/user.store';
import { RoleStore } from '../stores/role.store';
import { LeaveTypeStore } from '../stores/leave-type.store';
import { EmployeeStore } from '../stores/employee.store';

@Injectable({ providedIn: 'root' })
export class StoreManagerService {
    private readonly userStore = inject(UserStore);
    private readonly roleStore = inject(RoleStore);
    private readonly leaveTypeStore = inject(LeaveTypeStore);
    private readonly employeeStore = inject(EmployeeStore);

    unloadAll() {
        this.userStore.unload();
        this.roleStore.unload();
        this.leaveTypeStore.unload();
        this.employeeStore.unload();
    }
}
