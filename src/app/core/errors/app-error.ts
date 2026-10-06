/**
 * Error shared by every layer. `code` is the backend error code
 * (`{ code, message, details }`) or one of the client codes below; it is the
 * key used to translate the message, never the raw `message`.
 */
export class AppError extends Error {
  constructor(
    readonly code: string,
    readonly status = 0,
    message: string = code,
    readonly details: unknown = null,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const CLIENT_ERROR_CODES = {
  network: 'NETWORK_ERROR',
  unknown: 'UNKNOWN_ERROR',
  sessionExpired: 'SESSION_EXPIRED',
  sessionRestoreFailed: 'SESSION_RESTORE_FAILED',
} as const;

export function errorCodeOf(error: unknown): string {
  return error instanceof AppError ? error.code : CLIENT_ERROR_CODES.unknown;
}
