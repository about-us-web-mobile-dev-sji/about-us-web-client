import type { LoginResponse } from '../domain/models/authenticated-user.model';

export interface AuthState {
  session: LoginResponse | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}
