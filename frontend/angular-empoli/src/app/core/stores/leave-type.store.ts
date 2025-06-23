import { Injectable } from '@angular/core';
import { LeaveType } from '../models/leave-type';
import { BaseStore } from './base/base.store';

@Injectable({
    providedIn: 'root',
})
export class LeaveTypeStore extends BaseStore<LeaveType> {}
