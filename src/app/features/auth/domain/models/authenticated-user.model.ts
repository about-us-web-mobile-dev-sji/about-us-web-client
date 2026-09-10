export interface AuthenticatedUser {
  readonly id: string;
  readonly email: string;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly globalRole: 'SUPER_ADMIN' | 'USER';
}

export interface LoginResponse {
  readonly user: AuthenticatedUser;
  readonly sessionId: string;
}
