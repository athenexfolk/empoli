import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import type { Employee } from '../../../core/models/employee';
import { CdkTableModule } from '@angular/cdk/table';
import { EmployeeStore } from '../../../core/stores/employee.store';

@Component({
  selector: 'app-employee-list',
  imports: [CdkTableModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  protected readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);

  protected displayedColumns = ['code', 'firstName', 'lastName', 'action'];

  protected codeFilter = signal('');
  protected firstNameFilter = signal('');
  protected lastNameFilter = signal('');

  protected readonly filteredEmployees = computed(() => {
    return this.employeeStore
      .items()
      .filter(
        (emp) =>
          emp.code.toLowerCase().includes(this.codeFilter().toLowerCase()) &&
          emp.firstName
            .toLowerCase()
            .includes(this.firstNameFilter().toLowerCase()) &&
          emp.lastName
            .toLowerCase()
            .includes(this.lastNameFilter().toLowerCase()),
      );
  });

  ngOnInit() {
    if (!this.employeeStore.isLoaded) {
      this.employeeService.getEmployees().subscribe({
        next: (employees) => {
          this.employeeStore.loadEmployees(employees);
        },
        error: (err) => {
          console.error('Failed to load employees', err);
        },
      });
    }
  }
}
