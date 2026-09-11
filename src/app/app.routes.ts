import { Routes } from '@angular/router';
import { LoginForm } from './features/auth/presentation/components/login-form/login-form';
import { LoginPage } from './features/auth/presentation/pages/login-page/login-page';
import { SuperAdminDashboard } from './features/dashboard/presentation/pages/super-admin-dashboard/super-admin-dashboard';
import { UsersPage } from './features/users/presentation/pages/users-page/users-page';

export const routes: Routes = [
    {path: 'login', component:LoginPage},
    {path: 'super-admin', component: SuperAdminDashboard},
    {path: 'users', component: UsersPage},
    
];
