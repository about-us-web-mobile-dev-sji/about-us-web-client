import type { ChangePasswordCommand } from '../domain/models/password-change.model';
import type { AuthRepository, LoginCommand } from '../domain/ports/auth.repository';
import type { LoginResponse } from '../domain/models/authenticated-user.model';

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
}
