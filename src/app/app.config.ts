import { AppTheme } from './core/config/app-theme';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  AUTH_REPOSITORY_PROVIDER,
  AuthFacade,
  sessionRefreshInterceptor,
} from './features/auth';
import { credentialsInterceptor } from './core/http/credentials.interceptor';
import { API_BASE_URL } from './core/config/api.config';
import { environment } from '../environments/environment';
import { USER_REPOSITORY_PROVIDER } from './features/users/infrastructure/repositories/http-user.repository';
import { SCHOOL_REPOSITORY_PROVIDER } from './features/school/infrastructure/repositories/http-school.repository';
import { SCHOOL_MEMBERSHIP_REPOSITORY_PROVIDER } from './features/school/infrastructure/repositories/http-school-membership.repository';
import { SPACE_REPOSITORY_PROVIDER } from './features/spaces/infrastructure/repositories/http-space.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Order matters: credentials are added before a 401 can trigger a refresh and replay.
    provideHttpClient(withInterceptors([credentialsInterceptor, sessionRefreshInterceptor])),
    providePrimeNG({
      theme: { preset: AppTheme, options: { darkModeSelector: false } },
      license:
        'eyJpZCI6Ijc3Y2JjMjBmLTIyMDItNDhiMS1iOWJlLTQ1ZWI3OWY0YjBjZSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODkxMjY4MzMsImV4cCI6MTgyMDY2MjgzM30.gIRng8rFBBEAWRskUbdJ4jn9kd5HtosuOBxol5mPKPei-Cw_ugUdX75I8apTsFrAJ_y2dJ3F5GyEBa8hzL-rCw',
    }),
    provideAppInitializer(() => inject(AuthFacade).initialize()),
    AUTH_REPOSITORY_PROVIDER,
    USER_REPOSITORY_PROVIDER,
    SCHOOL_REPOSITORY_PROVIDER,
    SCHOOL_MEMBERSHIP_REPOSITORY_PROVIDER,
    SPACE_REPOSITORY_PROVIDER,
    { provide: API_BASE_URL, useValue: environment.apiUrl },
  ],
};
