import { Injectable, inject } from '@angular/core';
import type { ChangePasswordCommand } from '../domain/models/password-change.model';
import type { LoginResponse } from '../domain/models/authenticated-user.model';
import type { ActiveSession } from '../domain/models/active-session.model';
import type { LoginCommand } from '../domain/ports/auth.repository';
import { AuthStore } from './auth.store';

/** Public entry point of the auth feature for pages, guards, layout and app config. */
@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(AuthStore);

  readonly session = this.store.session;
  readonly sessionId = this.store.sessionId;
  readonly user = this.store.user;
  readonly isInitialized = this.store.isInitialized;
  readonly isLoading = this.store.isLoading;
  readonly isAuthenticated = this.store.isAuthenticated;
  readonly isSuperAdmin = this.store.isSuperAdmin;
  readonly userName = this.store.userName;
  readonly errorCode = this.store.errorCode;

  initialize(): Promise<void> {
    return this.store.initialize();
  }
  login(command: LoginCommand): Promise<LoginResponse> {
    return this.store.login(command);
  }
  logout(): Promise<void> {
    return this.store.logout();
  }
  changePassword(command: ChangePasswordCommand): Promise<void> {
    return this.store.changePassword(command);
  }
  logoutEverywhere(): Promise<void> {
    return this.store.logoutEverywhere();
  }
  listSessions(): Promise<ActiveSession[]> {
    return this.store.listSessions();
  }
  revokeSession(session: ActiveSession): Promise<void> {
    return this.store.revokeSession(session);
  }
  googleSignInUrl(returnUrl: string | null): string {
    return this.store.googleSignInUrl(returnUrl);
  }
  refreshSession(): Promise<boolean> {
    return this.store.refreshSession();
  }
  expireSession(): void {
    this.store.expireSession();
  }
}
