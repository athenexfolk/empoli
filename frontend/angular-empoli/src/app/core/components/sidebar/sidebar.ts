import { Component, computed, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink, HasRoleDirective],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css',
})
export class Sidebar {
    protected readonly sidebarService = inject(SidebarService);
    protected readonly authService = inject(AuthService);
    protected readonly router = inject(Router);

    name = computed(() => {
        if (!this.authService.bindEmployee()) {
            return 'Guest';
        }
        return (
            this.authService.bindEmployee()?.firstName +
            ' ' +
            this.authService.bindEmployee()?.lastName
        );
    });

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
