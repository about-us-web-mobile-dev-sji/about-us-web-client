import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { API_BASE_URL } from '../../config/api.config';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { getHttpErrorMessage } from '../error-message/http-error-message';
import { SKIP_ERROR_TOAST } from './skip-error-toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = inject(API_BASE_URL);
  const notifications = inject(NotificationService);

  if (!req.url.startsWith(baseUrl)) return next(req);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && !req.context.get(SKIP_ERROR_TOAST)) {
        const message = getHttpErrorMessage(error);
        if (error.status === 0 || error.status >= 500) {
          notifications.error('Erreur', message);
        } else {
          notifications.warn('Attention', message);
        }
      }
      return throwError(() => error);
    }),
  );
};
