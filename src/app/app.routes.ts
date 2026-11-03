import { AdminLayout } from './core/layout/admin-layout/admin-layout';
import { Routes } from '@angular/router';
import { LoginPage, ForbiddenPage, AuthCallbackPage, authGuard } from './features/auth';
import { AcceptInvitationPage } from './features/school/presentation/pages/accept-invitation-page/accept-invitation-page';
import { SuperAdminDashboard } from './features/dashboard/presentation/pages/super-admin-dashboard/super-admin-dashboard';
import { HomePage } from './features/dashboard/presentation/pages/home-page/home-page';

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
      // Paramètres du compte connecté (menu du profil) : barre latérale dédiée, un onglet par sujet.
      {
        path: 'account',
        loadComponent: () => import('./features/settings/presentation/pages/account-workspace/account-workspace').then((m) => m.AccountWorkspace),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'profile' },
          { path: 'profile', loadComponent: () => import('./features/settings/presentation/pages/account-profile-page/account-profile-page').then((m) => m.AccountProfilePage) },
          { path: 'security', loadComponent: () => import('./features/settings/presentation/pages/account-security-page/account-security-page').then((m) => m.AccountSecurityPage) },
          { path: 'activity', pathMatch: 'full', redirectTo: 'security' },
        ],
      },
      { path: 'settings', pathMatch: 'full', redirectTo: 'account/profile' },
      { path: 'users', loadComponent: () => import('./features/users/presentation/pages/users-page/users-page').then((m) => m.UsersPage) },
      { path: 'schools', loadComponent: () => import('./features/school/presentation/pages/schools-list-page/schools-list-page').then((m) => m.SchoolsListPage) },
      {
        // Espace d'une école : seconde barre latérale + un onglet par sujet (voir DESIGN.md).
        path: 'schools/:schoolId',
        loadComponent: () => import('./features/school/presentation/pages/school-workspace/school-workspace').then((m) => m.SchoolWorkspace),
        children: [
          // Les espaces sont l'onglet principal d'une école.
          { path: '', loadComponent: () => import('./features/school/presentation/pages/school-spaces-page/school-spaces-page').then((m) => m.SchoolSpacesPage) },
          // L'ancienne « Vue d'ensemble » a été retirée : ses informations sont dans les Paramètres.
          { path: 'overview', pathMatch: 'full', redirectTo: '' },
          { path: 'members', loadComponent: () => import('./features/school/presentation/pages/school-members-page/school-members-page').then((m) => m.SchoolMembersPage) },
          { path: 'invitations', loadComponent: () => import('./features/school/presentation/pages/school-invitations-page/school-invitations-page').then((m) => m.SchoolInvitationsPage) },
          { path: 'spaces', pathMatch: 'full', redirectTo: '' },
          // Un espace ouvert depuis l'organigramme : sa barre latérale se colle à celle de l'école.
          {
            path: 'spaces/:spaceId',
            data: { stuck: true },
            loadComponent: () => import('./features/spaces/presentation/pages/space-workspace/space-workspace').then((m) => m.SpaceWorkspace),
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'resources' },
              { path: 'resources', loadComponent: () => import('./features/spaces/presentation/pages/space-resources-page/space-resources-page').then((m) => m.SpaceResourcesPage) },
              { path: 'members', loadComponent: () => import('./features/spaces/presentation/pages/space-members-page/space-members-page').then((m) => m.SpaceMembersPage) },
            ],
          },
          {
            path: 'settings',
            // Chargée à la demande : le dialogue et la recherche de membres n'alourdissent pas le démarrage.
            loadComponent: () =>
              import('./features/school/presentation/pages/school-settings-page/school-settings-page').then((m) => m.SchoolSettingsPage),
          },
          { path: 'replace-admin', pathMatch: 'full', redirectTo: 'settings' },
          // La modification se fait en place dans les Paramètres.
          { path: 'edit', pathMatch: 'full', redirectTo: 'settings' },
        ],
      },
      { path: 'events', loadComponent: () => import('./features/event-logs/presentation/pages/event-logs-page/event-logs-page').then((m) => m.EventLogsPage) },
      { path: 'events/log/:id', loadComponent: () => import('./features/event-logs/presentation/pages/event-log-detail-page/event-log-detail-page').then((m) => m.EventLogDetailPage) },
      { path: 'events/aggregate/:entityType/:entityId', loadComponent: () => import('./features/event-logs/presentation/pages/event-logs-page/event-logs-page').then((m) => m.EventLogsPage) },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: 'forbidden', component: ForbiddenPage },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
