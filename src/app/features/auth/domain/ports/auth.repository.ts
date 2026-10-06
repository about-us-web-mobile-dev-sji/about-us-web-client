import type { ChangePasswordCommand } from '../models/password-change.model';
import type { LoginResponse } from '../models/authenticated-user.model';
import type { ActiveSession } from '../models/active-session.model';

export interface LoginCommand {
  readonly email: string;
  readonly password: string;
}

/** Every method rejects with an AppError carrying the backend error code. */
export interface AuthRepository {
  login(command: LoginCommand): Promise<LoginResponse>;
  /** Renews the session from the refresh cookie; null when no valid session exists. */
  restoreSession(): Promise<LoginResponse | null>;
  logout(): Promise<void>;
  changePassword(command: ChangePasswordCommand): Promise<void>;
  listSessions(): Promise<ActiveSession[]>;
  revokeSession(sessionId: string): Promise<void>;
  /** Signs out every device, this one included. */
  revokeAllSessions(): Promise<void>;
  /** Address that starts the Google sign-in, coming back to returnUrl afterwards. */
  googleSignInUrl(returnUrl: string | null): string;
}
