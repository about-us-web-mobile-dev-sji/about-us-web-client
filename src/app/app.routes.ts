import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/presentation/pages/login-page/login-page';
import { ForbiddenPage } from './features/auth/presentation/pages/forbidden-page/forbidden-page';
import { authGuard } from './features/auth/presentation/guards/auth.guard';
import { SuperAdminDashboard } from './features/dashboard/presentation/pages/super-admin-dashboard/super-admin-dashboard';
import { UsersPage } from './features/users/presentation/pages/users-page/users-page';
import { HomePage } from './features/dashboard/presentation/pages/home-page/home-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [authGuard()] },
  {
    path: 's/home',
    component: SuperAdminDashboard,
    canActivate: [authGuard(['SUPER_ADMIN'])],
  },
  { path: 'forbidden', component: ForbiddenPage },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'users', component: UsersPage},
];
