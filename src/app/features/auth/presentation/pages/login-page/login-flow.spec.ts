import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../../../../app.routes';
import { API_BASE_URL } from '../../../../../core/config/api.config';
import { AuthStore } from '../../../application/auth.store';
import { AUTH_REPOSITORY_PROVIDER } from '../../../infrastructure/repositories/http-auth.repository';
import { LoginPage } from './login-page';

describe('Login with the real store and router', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AUTH_REPOSITORY_PROVIDER,
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  for (const role of ['SUPER_ADMIN', 'USER'] as const) {
    it(`stores the session and routes ${role} after anonymous restoration`, async () => {
      const store = TestBed.inject(AuthStore);
      const initialized = store.initialize();
      await Promise.resolve();
      http
        .expectOne('/api/auth/web/refresh')
        .flush({}, { status: 401, statusText: 'Unauthorized' });
      await initialized;
      const harness = await RouterTestingHarness.create();
      const page = await harness.navigateByUrl('/login?returnUrl=%2Fhome', LoginPage);
      const response = {
        user: {
          id: '1',
          email: 'user@example.com',
          firstName: null,
          lastName: null,
          globalRole: role,
        },
        sessionId: 'test-session',
      };
      const login = page.handleSubmit({ email: response.user.email, password: 'password' });
      await Promise.resolve();
      http.expectOne('/api/auth/web/login/email').flush(response);
      await login;

      expect(store.session()).toEqual(response);
      expect(store.isSuperAdmin()).toBe(role === 'SUPER_ADMIN');
      expect(TestBed.inject(Router).url).toBe(role === 'SUPER_ADMIN' ? '/s/home' : '/home');
      http.expectNone('/api/auth/web/refresh');
    });
  }
});
