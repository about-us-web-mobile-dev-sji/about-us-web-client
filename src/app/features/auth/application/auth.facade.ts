import type { ChangePasswordCommand } from '../domain/models/password-change.model';
import type { LoginResponse } from '../domain/models/authenticated-user.model';
import { Injectable, inject } from '@angular/core';
import { LoginCommand } from '../domain/ports/auth.repository';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(AuthStore);

  readonly session = this.store.session;
  readonly user = this.store.user;
  readonly sessionId = this.store.sessionId;
  readonly isLoading = this.store.isLoading;
  readonly isInitialized = this.store.isInitialized;
  readonly isAuthenticated = this.store.isAuthenticated;
  readonly isSuperAdmin = this.store.isSuperAdmin;
  readonly userName = this.store.userName;
  readonly error = this.store.error;

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
}
