import { Injectable } from '@angular/core';
import { BaseStore } from './base/base.store';
import type { Role } from '../models/role';

@Injectable({
    providedIn: 'root',
})
export class RoleStore extends BaseStore<Role> {}
