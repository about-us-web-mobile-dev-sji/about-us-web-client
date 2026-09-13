import { AdminLayout } from './core/layout/admin-layout/admin-layout';
import { AdminSettingsPage } from './features/settings/presentation/pages/admin-settings-page/admin-settings-page';
import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/presentation/pages/login-page/login-page';
import { ForbiddenPage } from './features/auth/presentation/pages/forbidden-page/forbidden-page';
import { authGuard } from './features/auth/presentation/guards/auth.guard';
import { SuperAdminDashboard } from './features/dashboard/presentation/pages/super-admin-dashboard/super-admin-dashboard';
import { UsersPage } from './features/users/presentation/pages/users-page/users-page';
import { HomePage } from './features/dashboard/presentation/pages/home-page/home-page';
import { EventLogsPage } from './features/event-logs/presentation/pages/event-logs-page/event-logs-page';
import { EventLogDetailPage } from './features/event-logs/presentation/pages/event-log-detail-page/event-log-detail-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [authGuard()] },
  {
    path: 's',
    component: AdminLayout,
    canActivate: [authGuard(['SUPER_ADMIN'])],
    canActivateChild: [authGuard(['SUPER_ADMIN'])],
    children: [
      { path: 'home', component: SuperAdminDashboard },
      { path: 'settings', component: AdminSettingsPage },
      { path: 'users', component: UsersPage },
      { path: 'events', component: EventLogsPage },
      { path: 'events/log/:id', component: EventLogDetailPage },
      { path: 'events/aggregate/:entityType/:entityId', component: EventLogsPage },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: 'forbidden', component: ForbiddenPage },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  
];
