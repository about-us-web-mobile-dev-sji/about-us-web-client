import { InjectionToken } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticated-user.model';

export interface LoginCommand {
  email: string;
  password: string;
}

export interface AuthRepository {
  login(command: LoginCommand): Promise<AuthenticatedUser>;
}

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');
