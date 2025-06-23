import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
    selector: 'app-employee-count',
    imports: [],
    templateUrl: './employee-count.html',
    styleUrl: './employee-count.css',
})
export class EmployeeCount {
    protected readonly employeeService = inject(EmployeeService);

    count = signal(0);

    ngOnInit() {
        this.employeeService.getEmployees().subscribe({
            next: (employees) => {
                this.count.set(employees.length);
            },
        });
    }
}
