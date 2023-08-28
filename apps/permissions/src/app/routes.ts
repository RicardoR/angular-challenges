import { ManagerDashboardComponent } from './dashboard/manager.component';
import { manager } from './user.model';
import { inject } from '@angular/core';
import { UserStore } from './user.store';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => inject(UserStore).hasAnyRole('ADMIN')],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [() => inject(UserStore).hasPermission('MANAGER')],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/user.component').then(
        (m) => m.UserDashboardComponent
      ),
  },
];
