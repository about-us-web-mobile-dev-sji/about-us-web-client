import type { LoginResponse } from '../models/authenticated-user.model';

export interface LoginCommand {
  readonly email: string;
  readonly password: string;
}

export interface AuthRepository {
  login(command: LoginCommand): Promise<LoginResponse>;
  /** Returns null when no valid session exists; rejects on technical failures. */
  restoreSession(): Promise<LoginResponse | null>;
  logout(): Promise<void>;
}
