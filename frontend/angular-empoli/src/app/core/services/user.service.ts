import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { User } from '../models/user';
import type { CreateUserDto } from '../dtos/create-user';
import type { ChangePasswordRequest } from '../dtos/change-password-request';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient);

    getUsers() {
        return this.http.get<User[]>('/api/user');
    }

    getUserById(id: string) {
        return this.http.get<User>(`/api/user/${id}`);
    }

    createUser(dto: CreateUserDto, roleName?: string) {
        let params = new HttpParams();
        if (roleName) {
            params = params.append('roleName', roleName);
        }
        return this.http.post<User>('/api/user', dto, { params });
    }

    changePassword(id: string, dto: ChangePasswordRequest) {
        return this.http.post<void>(`/api/user/${id}/change-password`, dto);
    }

    addUserRole(id: string, roleName: string) {
        return this.http.post<void>(
            `/api/user/${id}/role`,
            {},
            {
                params: { roleName },
            },
        );
    }

    removeUserRole(id: string, roleName: string) {
        return this.http.delete<void>(`/api/user/${id}/role`, {
            params: { roleName },
        });
    }
}
