import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import type { Employee } from '../../../core/models/employee';
import { CdkTableModule } from '@angular/cdk/table';
import { EmployeeStore } from '../../../core/stores/employee.store';
import { FormsModule } from '@angular/forms';
import { compareField } from '../../../shared/utils/compare-field';
import { SortIndicator } from '../../../shared/components/sort-indicator/sort-indicator';
import { Toggler } from '../../../shared/utils/toggler';

@Component({
  selector: 'app-employee-list',
  imports: [CdkTableModule, FormsModule, SortIndicator],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  protected readonly employeeStore = inject(EmployeeStore);
  private readonly employeeService = inject(EmployeeService);

  protected sortField = signal<keyof Employee>('code');
  protected sortDirection = signal<SortDirection>('asc');

  protected displayedColumns = ['code', 'firstName', 'lastName', 'action'];

  protected codeFilter = signal('');
  protected firstNameFilter = signal('');
  protected lastNameFilter = signal('');

  protected codeSearchPanel = new Toggler();
  protected firstNameSearchPanel = new Toggler();
  protected lastNameSearchPanel = new Toggler();

  protected readonly filteredEmployees = computed(() => {
    const field = this.sortField();
    const direction = this.sortDirection();

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
      )
      .sort((a, b) => compareField(a, b, field, direction));
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

  setSort(field: keyof Employee) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
