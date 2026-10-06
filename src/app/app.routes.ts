import { AdminLayout } from './core/layout/admin-layout/admin-layout';
import { AdminSettingsPage } from './features/settings/presentation/pages/admin-settings-page/admin-settings-page';
import { Routes } from '@angular/router';
import { LoginPage, ForbiddenPage, AuthCallbackPage, authGuard } from './features/auth';
import { AcceptInvitationPage } from './features/school/presentation/pages/accept-invitation-page/accept-invitation-page';
import { SuperAdminDashboard } from './features/dashboard/presentation/pages/super-admin-dashboard/super-admin-dashboard';
import { UsersPage } from './features/users/presentation/pages/users-page/users-page';
import { HomePage } from './features/dashboard/presentation/pages/home-page/home-page';
import { EventLogsPage } from './features/event-logs/presentation/pages/event-logs-page/event-logs-page';
import { EventLogDetailPage } from './features/event-logs/presentation/pages/event-log-detail-page/event-log-detail-page';
import { SchoolsListPage } from './features/school/presentation/pages/schools-list-page/schools-list-page';
import { SchoolDetailPage } from './features/school/presentation/pages/school-detail-page/school-detail-page';
import { EditSchoolPage } from './features/school/presentation/pages/edit-school-page/edit-school-page';
import { ReplaceAdminPage } from './features/school/presentation/pages/replace-admin-page/school-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'auth/callback', component: AuthCallbackPage },
  { path: 'invitations/accept', component: AcceptInvitationPage, canActivate: [authGuard()] },
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
      { path: 'schools', component: SchoolsListPage },
      { path: 'schools/:schoolId/edit', component: EditSchoolPage },
      { path: 'schools/:schoolId', component: SchoolDetailPage },
      { path: 'schools/:schoolId/replace-admin', component: ReplaceAdminPage },
      { path: 'events', component: EventLogsPage },
      { path: 'events/log/:id', component: EventLogDetailPage },
      { path: 'events/aggregate/:entityType/:entityId', component: EventLogsPage },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: 'forbidden', component: ForbiddenPage },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
