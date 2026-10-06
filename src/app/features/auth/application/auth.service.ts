import type { ChangePasswordCommand } from '../domain/models/password-change.model';
import type { AuthRepository, LoginCommand } from '../domain/ports/auth.repository';
import type { LoginResponse } from '../domain/models/authenticated-user.model';
import type { ActiveSession } from '../domain/models/active-session.model';

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  login(command: LoginCommand): Promise<LoginResponse> {
    return this.repository.login(command);
  }

  restoreSession(): Promise<LoginResponse | null> {
    return this.repository.restoreSession();
  }

  logout(): Promise<void> {
    return this.repository.logout();
  }
  changePassword(command: ChangePasswordCommand): Promise<void> {
    return this.repository.changePassword(command);
  }

  listSessions(): Promise<ActiveSession[]> {
    return this.repository.listSessions();
  }

  revokeSession(sessionId: string): Promise<void> {
    return this.repository.revokeSession(sessionId);
  }

  revokeAllSessions(): Promise<void> {
    return this.repository.revokeAllSessions();
  }

  googleSignInUrl(returnUrl: string | null): string {
    return this.repository.googleSignInUrl(returnUrl);
  }
}
