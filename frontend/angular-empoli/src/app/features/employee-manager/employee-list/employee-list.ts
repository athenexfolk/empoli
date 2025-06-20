import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import type { Employee } from '../../../core/models/employee';
import { CdkTableModule } from '@angular/cdk/table';
import { EmployeeStore } from '../../../core/stores/employee.store';
import { FormsModule } from '@angular/forms';
import { compareField } from '../../../shared/utils/compare-field';
import { SortIndicator } from '../../../shared/components/sort-indicator/sort-indicator';
import { Toggler } from '../../../shared/utils/toggler';
import { UpdateEmployee } from '../update-employee/update-employee';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'employee-list',
  imports: [CdkTableModule, FormsModule, SortIndicator, UpdateEmployee, Button],
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
    'action',
  ];

  protected employeeIdFilter = signal('');
  protected firstNameFilter = signal('');
  protected lastNameFilter = signal('');

  protected employeeIdSearchPanel = new Toggler();
  protected firstNameSearchPanel = new Toggler();
  protected lastNameSearchPanel = new Toggler();

  protected readonly updatePanel = new Toggler();
  protected readonly deletePanel = new Toggler();

  protected currentFocusedEmployee = signal<Employee | null>(null);

  protected readonly filteredEmployees = computed(() => {
    const field = this.sortField();
    const direction = this.sortDirection();

    return this.employeeStore
      .items()
      .filter(
        (emp) =>
          emp.employeeId
            .toLowerCase()
            .includes(this.employeeIdFilter().toLowerCase()) &&
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

  openupdatePanel(employee: Employee) {
    this.currentFocusedEmployee.set(employee);
    this.updatePanel.activate();
  }

  closeupdatePanel() {
    this.updatePanel.deactivate();
    this.currentFocusedEmployee.set(null);
  }

  openDeletePanel(employee: Employee) {
    this.currentFocusedEmployee.set(employee);
    this.deletePanel.activate();
  }

  closeDeletePanel() {
    this.deletePanel.deactivate();
    this.currentFocusedEmployee.set(null);
  }
}
