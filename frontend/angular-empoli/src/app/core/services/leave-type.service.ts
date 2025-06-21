import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { LeaveType } from '../models/leave-type';
import type { UpdateLeaveTypeDto } from '../dtos/update-leave-type';
import type { CreateLeaveTypeDto } from '../dtos/create-leave-type';

@Injectable({
  providedIn: 'root',
})
export class LeaveTypeService {
  private readonly http = inject(HttpClient);

  getLeaveTypes() {
    return this.http.get<LeaveType[]>('/api/leavetype');
  }

  getLeaveTypeById(id: string) {
    return this.http.get<LeaveType>(`/api/leavetype/${id}`);
  }

  createLeaveType(dto: CreateLeaveTypeDto) {
    return this.http.post<LeaveType>('/api/leavetype', dto);
  }

  updateLeaveType(id: string, dto: UpdateLeaveTypeDto) {
    return this.http.put<LeaveType>(`/api/leavetype/${id}`, dto);
  }

  deleteLeaveType(id: string) {
    return this.http.delete<void>(`/api/leavetype/${id}`);
  }
}
