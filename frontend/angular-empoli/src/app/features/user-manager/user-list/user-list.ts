import { CdkTableModule } from '@angular/cdk/table';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortIndicator } from '../../../shared/components/sort-indicator/sort-indicator';
import { Button } from '../../../shared/components/button/button';
import { UserService } from '../../../core/services/user.service';
import { UserStore } from '../../../core/stores/user.store';
import type { User } from '../../../core/models/user';
import { compareField } from '../../../shared/utils/compare-field';

@Component({
    selector: 'user-list',
    imports: [CdkTableModule, FormsModule, SortIndicator, Button],
    templateUrl: './user-list.html',
    styleUrl: './user-list.css',
})
export class UserList {
    protected readonly userStore = inject(UserStore);
    private readonly userService = inject(UserService);

    protected sortField = signal<keyof User>('email');
    protected sortDirection = signal<'asc' | 'desc'>('asc');

    protected displayedColumns = ['index', 'email', 'roles'];

    protected emailFilter = signal('');

    protected readonly filteredUsers = computed(() => {
        const field = this.sortField();
        const direction = this.sortDirection();

        return this.userStore
            .items()
            .filter((user) =>
                user.email
                    .toLowerCase()
                    .includes(this.emailFilter().toLowerCase()),
            )
            .sort((a, b) => compareField(a, b, field, direction));
    });

    ngOnInit() {
        if (!this.userStore.isLoaded) {
            this.userService.getUsers().subscribe({
                next: (users) => {
                    this.userStore.load(users);
                },
            });
        }
    }

    setSort(field: keyof User) {
        if (this.sortField() === field) {
            this.sortDirection.set(
                this.sortDirection() === 'asc' ? 'desc' : 'asc',
            );
        } else {
            this.sortField.set(field);
            this.sortDirection.set('asc');
        }
    }
}
