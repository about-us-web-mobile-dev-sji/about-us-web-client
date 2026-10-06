// Public API of the auth feature: import from here, never from its internal folders.
export { AuthFacade } from './application/auth.facade';
export type { AuthenticatedUser } from './domain/models/authenticated-user.model';
export type { ChangePasswordCommand } from './domain/models/password-change.model';
export { authGuard } from './presentation/guards/auth.guard';
export { LoginPage } from './presentation/pages/login-page/login-page';
export { ForbiddenPage } from './presentation/pages/forbidden-page/forbidden-page';
export { AuthCallbackPage } from './presentation/pages/auth-callback-page/auth-callback-page';
export { LogoutButton } from './presentation/components/logout-button/logout-button';
export { SessionsPanel } from './presentation/components/sessions-panel/sessions-panel';
export { ChangePasswordForm } from './presentation/components/change-password-form/change-password-form';
export { AUTH_REPOSITORY_PROVIDER } from './infrastructure/repositories/http-auth.repository';
export { sessionRefreshInterceptor } from './infrastructure/http/session-refresh.interceptor';
