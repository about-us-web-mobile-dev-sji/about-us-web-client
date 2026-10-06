import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL } from '../config/api.config';

/** The session lives in HttpOnly cookies: every API call must send them. */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) =>
  req.url.startsWith(inject(API_BASE_URL)) ? next(req.clone({ withCredentials: true })) : next(req);
