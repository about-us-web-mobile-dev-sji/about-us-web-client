export interface ChangePasswordCommand {
  readonly currentPassword: string;
  readonly newPassword: string;
}
