import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BaseStore } from './base/base.store';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStore extends BaseStore<Employee> {
  isLoaded = false;

  loadEmployees(employees: Employee[]) {
    this.isLoaded = true;
    this.setAll(employees);
  }

  unloadEmployees() {
    this.isLoaded = false;
    this.clear();
  }
}
