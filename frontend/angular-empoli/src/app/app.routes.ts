import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard/dashboard.page';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'employee-manager',
    loadChildren: () =>
      import('./features/employee-manager/employee-manager.routes').then(
        (r) => r.routes,
      ),
  },
];
