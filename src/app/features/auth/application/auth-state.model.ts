import type { LoginResponse } from '../domain/models/authenticated-user.model';

export interface AuthState {
  session: LoginResponse | null;
  isLoading: boolean;
  isInitialized: boolean;
  /** Translation key of the last auth failure (see core/i18n/error-messages). */
  errorCode: string | null;
}
