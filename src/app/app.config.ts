import { AuthStore } from './features/auth/application/auth.store';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AUTH_REPOSITORY_PROVIDER } from './features/auth/infrastructure/repositories/http-auth.repository';
import { API_BASE_URL } from './core/config/api.config';
import { environment } from '../environments/environment';
import { USER_REPOSITORY_PROVIDER } from './features/users/infrastructure/repositories/http-user.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideAppInitializer(() => inject(AuthStore).initialize()),
    AUTH_REPOSITORY_PROVIDER,
    USER_REPOSITORY_PROVIDER,
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ]
};
