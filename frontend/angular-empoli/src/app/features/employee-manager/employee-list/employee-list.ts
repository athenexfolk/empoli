import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import type { Employee } from '../../../core/models/employee';
import { CdkTableModule } from '@angular/cdk/table';
import { EmployeeStore } from '../../../core/stores/employee.store';
import { FormsModule } from '@angular/forms';
import { compareField } from '../../../shared/utils/compare-field';
import { SortIndicator } from '../../../shared/components/sort-indicator/sort-indicator';
import { Toggler } from '../../../shared/utils/toggler';
import { Button } from '../../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
    selector: 'employee-list',
    imports: [
        CdkTableModule,
        FormsModule,
        SortIndicator,
        Button,
        RouterLink,
        DatePipe,
        Icon,
    ],
    templateUrl: './employee-list.html',
    styleUrl: './employee-list.css',
})
export class EmployeeList {
    protected readonly employeeStore = inject(EmployeeStore);
    private readonly employeeService = inject(EmployeeService);

    protected sortField = signal<keyof Employee>('employeeId');
    protected sortDirection = signal<SortDirection>('asc');

    protected displayedColumns = [
        'index',
        'employeeId',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'dateOfBirth',
        'hireDate',
        'jobTitle',
        'department',
        'status',
        'action',
    ];

    protected employeeIdFilter = signal('');
    protected firstNameFilter = signal('');
    protected lastNameFilter = signal('');
    protected emailFilter = signal('');
    protected phoneNumberFilter = signal('');
    protected dateOfBirthFilter = signal('');
    protected hireDateFilter = signal('');
    protected jobTitleFilter = signal('');
    protected departmentFilter = signal('');
    protected statusFilter = signal('');

    protected employeeIdSearchPanel = new Toggler();
    protected firstNameSearchPanel = new Toggler();
    protected lastNameSearchPanel = new Toggler();
    protected emailSearchPanel = new Toggler();
    protected phoneNumberSearchPanel = new Toggler();
    protected dateOfBirthSearchPanel = new Toggler();
    protected hireDateSearchPanel = new Toggler();
    protected jobTitleSearchPanel = new Toggler();
    protected departmentSearchPanel = new Toggler();
    protected statusSearchPanel = new Toggler();

    protected currentFocusedEmployee = signal<Employee | null>(null);

    protected readonly filteredEmployees = computed(() => {
        const field = this.sortField();
        const direction = this.sortDirection();

        return this.employeeStore
            .items()
            .filter(
                (emp) =>
                    (emp.employeeId?.toLowerCase() ?? '').includes(
                        this.employeeIdFilter().toLowerCase(),
                    ) &&
                    (emp.firstName?.toLowerCase() ?? '').includes(
                        this.firstNameFilter().toLowerCase(),
                    ) &&
                    (emp.lastName?.toLowerCase() ?? '').includes(
                        this.lastNameFilter().toLowerCase(),
                    ) &&
                    (emp.email?.toLowerCase() ?? '').includes(
                        this.emailFilter().toLowerCase(),
                    ) &&
                    (emp.phoneNumber?.toLowerCase() ?? '').includes(
                        this.phoneNumberFilter().toLowerCase(),
                    ) &&
                    (this.dateOfBirthFilter() === '' ||
                        (emp.dateOfBirth &&
                            emp.dateOfBirth
                                .toString()
                                .includes(this.dateOfBirthFilter()))) &&
                    (this.hireDateFilter() === '' ||
                        (emp.hireDate &&
                            emp.hireDate
                                .toString()
                                .includes(this.hireDateFilter()))) &&
                    (emp.jobTitle?.toLowerCase() ?? '').includes(
                        this.jobTitleFilter().toLowerCase(),
                    ) &&
                    (emp.department?.toLowerCase() ?? '').includes(
                        this.departmentFilter().toLowerCase(),
                    ) &&
                    (emp.status !== undefined && emp.status !== null
                        ? emp.status.toString().toLowerCase()
                        : ''
                    ).includes(this.statusFilter().toLowerCase()),
            )
            .sort((a, b) => compareField(a, b, field, direction));
    });

    ngOnInit() {
        if (!this.employeeStore.isLoaded) {
            this.employeeService.getEmployees().subscribe({
                next: (employees) => {
                    this.employeeStore.load(employees);
                },
            });
        }
    }

    setSort(field: keyof Employee) {
        if (this.sortField() === field) {
            this.sortDirection.set(
                this.sortDirection() === 'asc' ? 'desc' : 'asc',
            );
        } else {
            this.sortField.set(field);
            this.sortDirection.set('asc');
        }
    }
}
