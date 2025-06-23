import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Role } from '../models/role';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private readonly http = inject(HttpClient);

    getRoles() {
        return this.http.get<Role[]>('/api/role');
    }

    getRoleById(id: string) {
        return this.http.get<Role>(`/api/role/${id}`);
    }

    createRole(name: string) {
        return this.http.post<Role>('/api/role', {}, { params: { name } });
    }

    deleteRole(id: string) {
        return this.http.delete(`/api/role/${id}`);
    }
}
