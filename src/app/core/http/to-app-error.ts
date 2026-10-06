import { HttpErrorResponse } from '@angular/common/http';
import { AppError, CLIENT_ERROR_CODES } from '../errors/app-error';

interface ApiErrorBody {
  code?: unknown;
  message?: unknown;
  details?: unknown;
}

/** Mirrors the backend fallback codes, for responses that carry no code (proxy, gateway…). */
const STATUS_CODES: Readonly<Record<number, string>> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE_ENTITY',
  429: 'TOO_MANY_REQUESTS',
};

function codeForStatus(status: number): string {
  if (status >= 500) return 'INTERNAL_SERVER_ERROR';
  return STATUS_CODES[status] ?? CLIENT_ERROR_CODES.unknown;
}

/** Converts any HTTP failure into an AppError carrying the backend error code. */
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  if (!(error instanceof HttpErrorResponse)) return new AppError(CLIENT_ERROR_CODES.unknown);
  if (error.status === 0) return new AppError(CLIENT_ERROR_CODES.network, 0);
  const body = (typeof error.error === 'object' && error.error) as ApiErrorBody | false;
  return new AppError(
    body && typeof body.code === 'string' ? body.code : codeForStatus(error.status),
    error.status,
    body && typeof body.message === 'string' ? body.message : error.message,
    body ? (body.details ?? null) : null,
  );
}

/** Backend code of an HTTP failure, or null when the body carries none. */
export function apiErrorCode(error: HttpErrorResponse): string | null {
  const code: unknown = (error.error as ApiErrorBody | null)?.code;
  return typeof code === 'string' ? code : null;
}
