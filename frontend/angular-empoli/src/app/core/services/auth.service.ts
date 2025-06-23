import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { StoreManagerService } from './store-manager.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly employeeService = inject(EmployeeService);
    private readonly storeManager = inject(StoreManagerService);

    private token = signal<string | null>(null);
    isAuthenticated = signal(false);
    bindEmployee = signal<Employee | null>(null);

    constructor() {
        effect(() => {
            const token = this.token();
            if (token) {
                localStorage.setItem('auth_token', token);
                this.isAuthenticated.set(true);
                this.getUserInfo();
            } else {
                localStorage.removeItem('auth_token');
                this.isAuthenticated.set(false);
            }
        });
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            try {
                const decoded: any = jwtDecode(storedToken);
                if (decoded.exp && Date.now() < decoded.exp * 1000) {
                    this.token.set(storedToken);
                    this.isAuthenticated.set(true);
                    this.getUserInfo();
                } else {
                    this.token.set(null);
                    this.isAuthenticated.set(false);
                }
            } catch {
                this.token.set(null);
                this.isAuthenticated.set(false);
            }
        }
    }

    login(email: string, password: string) {
        return this.http
            .post<{ token: string }>('/api/auth/login', { email, password })
            .pipe(
                tap({
                    next: ({ token }) => {
                        try {
                            const decoded: any = jwtDecode(token);
                            if (
                                decoded.exp &&
                                Date.now() < decoded.exp * 1000
                            ) {
                                this.token.set(token);
                                this.isAuthenticated.set(true);
                                this.getUserInfo();
                            } else {
                                this.token.set(null);
                                this.isAuthenticated.set(false);
                            }
                        } catch (e) {
                            console.error('Invalid JWT', e);
                            this.token.set(null);
                            this.isAuthenticated.set(false);
                        }
                    },
                    error: (error) => {
                        console.error('Login failed', error);
                        this.isAuthenticated.set(false);
                    },
                }),
            );
    }

    getUserInfo() {
        const storedToken = localStorage.getItem('auth_token');
        if (!storedToken) {
            return;
        }
        try {
            const decoded: any = jwtDecode(storedToken);
            const email =
                decoded[
                    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
                ];
            if (email) {
                this.employeeService.getEmployeeByEmail(email).subscribe({
                    next: (employee) => {
                        this.bindEmployee.set(employee);
                    },
                });
            }
        } catch {
            console.error('Failed to decode JWT', storedToken);
        }
    }

    logout() {
        this.token.set(null);
        this.isAuthenticated.set(false);
        this.bindEmployee.set(null);
        this.storeManager.unloadAll();
    }

    hasAnyRole(roles: string[]) {
        return true;
    }
}
