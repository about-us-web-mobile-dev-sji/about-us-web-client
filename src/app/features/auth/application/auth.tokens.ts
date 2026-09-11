import { InjectionToken, inject } from '@angular/core';
import type { AuthRepository } from '../domain/ports/auth.repository';
import { AuthService } from './auth.service';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE', {
  providedIn: 'root',
  factory: () => new AuthService(inject(AUTH_REPOSITORY)),
});
