import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard/dashboard.page';
import { PrimaryLayout } from './core/layouts/primary-layout/primary-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./core/components/login/login').then((m) => m.Login),
    },
    {
        path: '',
        component: PrimaryLayout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardPage,
            },
            {
                path: 'user-manager',
                loadChildren: () =>
                    import('./features/user-manager/user-manager.routes').then(
                        (r) => r.routes,
                    ),
            },
            {
                path: 'role-manager',
                loadChildren: () =>
                    import('./features/role-manager/role-manager.routes').then(
                        (r) => r.routes,
                    ),
            },
            {
                path: 'employee-manager',
                loadChildren: () =>
                    import(
                        './features/employee-manager/employee-manager.routes'
                    ).then((r) => r.routes),
            },
            {
                path: 'leave-type-manager',
                loadChildren: () =>
                    import(
                        './features/leave-type-manager/leave-type-manager.routes'
                    ).then((r) => r.routes),
            },
        ],
    },
];
