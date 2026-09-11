export interface ChangePasswordCommand {
  readonly currentPassword: string;
  readonly newPassword: string;
}

export type PasswordChangeFailure =
  'invalid' | 'unauthorized' | 'forbidden' | 'conflict' | 'unavailable';

export class PasswordChangeError extends Error {
  constructor(readonly reason: PasswordChangeFailure) {
    super('Password change failed');
    this.name = 'PasswordChangeError';
  }
}
