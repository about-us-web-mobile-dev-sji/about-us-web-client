import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { apiErrorCode } from '../../../../core/http/to-app-error';
import { AuthFacade } from '../../application/auth.facade';
import { AUTH_WEB_PATH } from '../repositories/http-auth.repository';
import { loginRedirect } from '../../application/auth-navigation';

/** The access cookie expired (or was dropped by the browser): a refresh can fix it. */
const RENEWABLE = new Set(['ACCESS_TOKEN_INVALID', 'ACCESS_TOKEN_REQUIRED']);
/** The session itself is dead: refreshing would fail too. */
const TERMINAL = new Set(['INVALID_SESSION', 'ACCOUNT_UNAVAILABLE']);

/**
 * UC-14. On a 401 caused by an expired access token, renews the session once
 * (shared by concurrent requests) and replays the request. When the session
 * cannot be renewed, clears it and sends the user to the login page with a
 * returnUrl. Other 401s (e.g. a wrong current password) are left untouched.
 */
export const sessionRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(API_BASE_URL);
  if (!req.url.startsWith(baseUrl) || req.url.startsWith(`${baseUrl}${AUTH_WEB_PATH}`))
    return next(req);

  const auth = inject(AuthFacade);
  const router = inject(Router);
  const endSession = () => {
    auth.expireSession();
    void router.navigateByUrl(loginRedirect(router));
  };

  return next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) return throwError(() => error);
      const code = apiErrorCode(error) ?? '';
      if (TERMINAL.has(code)) endSession();
      if (!RENEWABLE.has(code)) return throwError(() => error);

      return from(auth.refreshSession()).pipe(
        switchMap((renewed) => {
          if (renewed) return next(req);
          endSession();
          return throwError(() => error);
        }),
      );
    }),
  );
};
