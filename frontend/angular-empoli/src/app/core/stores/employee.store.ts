import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { BaseStore } from './base/base.store';

@Injectable({
    providedIn: 'root',
})
export class EmployeeStore extends BaseStore<Employee> {}
