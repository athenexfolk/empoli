import { CdkTableModule } from '@angular/cdk/table';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortIndicator } from '../../../shared/components/sort-indicator/sort-indicator';
import { Button } from '../../../shared/components/button/button';
import { RoleService } from '../../../core/services/role.service';
import { RoleStore } from '../../../core/stores/role.store';
import type { Role } from '../../../core/models/role';
import { compareField } from '../../../shared/utils/compare-field';

@Component({
    selector: 'role-list',
    standalone: true,
    imports: [CdkTableModule, FormsModule, SortIndicator, Button],
    templateUrl: './role-list.html',
    styleUrl: './role-list.css',
})
export class RoleList {
    protected readonly roleStore = inject(RoleStore);
    private readonly roleService = inject(RoleService);

    protected sortField = signal<keyof Role>('name');
    protected sortDirection = signal<'asc' | 'desc'>('asc');

    protected displayedColumns = ['index', 'name'];

    protected nameFilter = signal('');

    protected readonly filteredRoles = computed(() => {
        const field = this.sortField();
        const direction = this.sortDirection();

        return this.roleStore
            .items()
            .filter((role) =>
                role.name
                    .toLowerCase()
                    .includes(this.nameFilter().toLowerCase()),
            )
            .sort((a, b) => compareField(a, b, field, direction));
    });

    ngOnInit() {
        if (!this.roleStore.isLoaded) {
            this.roleService.getRoles().subscribe({
                next: (roles) => {
                    this.roleStore.load(roles);
                },
            });
        }
    }

    setSort(field: keyof Role) {
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
