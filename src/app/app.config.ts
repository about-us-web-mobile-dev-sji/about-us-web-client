import { AppTheme } from './core/config/app-theme';
import { providePrimeNG } from 'primeng/config';
import { AuthStore } from './features/auth/application/auth.store';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AUTH_REPOSITORY_PROVIDER } from './features/auth/infrastructure/repositories/http-auth.repository';
import { API_BASE_URL } from './core/config/api.config';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: { preset: AppTheme, options: { darkModeSelector: false } },
      license:
        'eyJpZCI6Ijc3Y2JjMjBmLTIyMDItNDhiMS1iOWJlLTQ1ZWI3OWY0YjBjZSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODkxMjY4MzMsImV4cCI6MTgyMDY2MjgzM30.gIRng8rFBBEAWRskUbdJ4jn9kd5HtosuOBxol5mPKPei-Cw_ugUdX75I8apTsFrAJ_y2dJ3F5GyEBa8hzL-rCw',
    }),
    provideAppInitializer(() => inject(AuthStore).initialize()),
    AUTH_REPOSITORY_PROVIDER,
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
};
