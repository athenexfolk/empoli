import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { CreateEmployeeDto } from '../dtos/create-employee';
import type { UpdateEmployeeDto } from '../dtos/update-employee';
import type { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private readonly http = inject(HttpClient);

    getEmployees() {
        return this.http.get<Employee[]>('/api/employee');
    }

    getEmployeeById(id: string) {
        return this.http.get<Employee>(`/api/employee/${id}`);
    }

    getEmployeeByEmail(email: string) {
        return this.http.get<Employee>(`/api/employee/email?email=${email}`);
    }

    createEmployee(dto: CreateEmployeeDto) {
        return this.http.post<Employee>('/api/employee', dto);
    }

    updateEmployee(id: string, dto: UpdateEmployeeDto) {
        return this.http.put<Employee>(`/api/employee/${id}`, dto);
    }
}
