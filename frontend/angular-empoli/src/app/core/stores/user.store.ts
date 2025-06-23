import { Injectable } from '@angular/core';
import { BaseStore } from './base/base.store';
import type { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserStore extends BaseStore<User> {
    isLoaded = false;

    loadUsers(users: User[]) {
        this.isLoaded = true;
        this.setAll(users);
    }

    unloadUsers() {
        this.isLoaded = false;
        this.clear();
    }
}
