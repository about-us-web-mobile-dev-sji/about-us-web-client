import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from '../../../core/config/api.config';
import { AUTH_REPOSITORY_PROVIDER } from '../infrastructure/repositories/http-auth.repository';
import { AuthFacade } from './auth.facade';

describe('AuthFacade login flow', () => {
  let facade: AuthFacade;
  let http: HttpTestingController;
  const command = { email: 'user@example.com', password: 'password' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AUTH_REPOSITORY_PROVIDER,
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    facade = TestBed.inject(AuthFacade);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  for (const globalRole of ['USER', 'SUPER_ADMIN'] as const) {
    it(`retains the session and only the expected user fields for ${globalRole}`, async () => {
      expect(facade.session()).toBeNull();
      expect(facade.user()).toBeNull();
      expect(facade.sessionId()).toBeNull();
      const response = {
        user: { id: '1', email: command.email, firstName: null, lastName: 'Doe', globalRole },
        sessionId: 'session-1',
      };
      const result = facade.login(command);
      await Promise.resolve();
      expect(facade.isLoading()).toBe(true);
      const request = http.expectOne('/api/auth/web/login/email');
      expect(request.request.method).toBe('POST');
      expect(request.request.withCredentials).toBe(true);
      expect(request.request.body).toEqual(command);
      request.flush({ ...response, user: { ...response.user, extraField: 'discarded' } });

      expect(await result).toEqual(response);
      expect(facade.session()).toEqual(response);
      expect(facade.user()).toEqual(response.user);
      expect(facade.sessionId()).toBe(response.sessionId);
      expect(facade.isAuthenticated()).toBe(true);
      expect(facade.isSuperAdmin()).toBe(globalRole === 'SUPER_ADMIN');
      expect(facade.isLoading()).toBe(false);
    });
  }

  it('propagates login errors and resets loading without creating a session', async () => {
    const result = facade.login(command);
    await Promise.resolve();
    const rejection = expect(result).rejects.toMatchObject({ status: 401 });
    http
      .expectOne('/api/auth/web/login/email')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    await rejection;
    expect(facade.session()).toBeNull();
    expect(facade.isLoading()).toBe(false);
  });
  it('restores the session once using the refresh cookie', async () => {
    const initialized = facade.initialize();
    expect(facade.initialize()).toBe(initialized);
    await Promise.resolve();
    const request = http.expectOne('/api/auth/web/refresh');
    expect(request.request.withCredentials).toBe(true);
    request.flush({
      user: { id: '1', email: command.email, firstName: null, lastName: null, globalRole: 'USER' },
      sessionId: 'restored',
    });
    await initialized;
    expect(facade.sessionId()).toBe('restored');
    expect(facade.userName()).toBe(command.email);
    expect(facade.isInitialized()).toBe(true);
    expect(facade.isAuthenticated()).toBe(true);

    const logout = facade.logout();
    await Promise.resolve();
    const logoutRequest = http.expectOne('/api/auth/web/logout');
    expect(logoutRequest.request.withCredentials).toBe(true);
    logoutRequest.flush(null, { status: 204, statusText: 'No Content' });
    await logout;
    expect(facade.user()).toBeNull();
    expect(facade.sessionId()).toBeNull();
    expect(facade.isAuthenticated()).toBe(false);
  });

  for (const status of [401, 500]) {
    it(`finishes initialization on HTTP ${status}`, async () => {
      const initialized = facade.initialize();
      await Promise.resolve();
      http.expectOne('/api/auth/web/refresh').flush({}, { status, statusText: 'Error' });
      await initialized;
      expect(facade.isInitialized()).toBe(true);
      expect(facade.isAuthenticated()).toBe(false);
      expect(facade.isLoading()).toBe(false);
      expect(facade.error() === null).toBe(status === 401);
    });
  }

  it('keeps the session when logout fails', async () => {
    const initialized = facade.initialize();
    await Promise.resolve();
    http.expectOne('/api/auth/web/refresh').flush({
      user: {
        id: '1',
        email: command.email,
        firstName: 'Jane',
        lastName: null,
        globalRole: 'USER',
      },
      sessionId: 'active',
    });
    await initialized;
    const logout = facade.logout();
    const rejection = expect(logout).rejects.toMatchObject({ status: 500 });
    await Promise.resolve();
    http.expectOne('/api/auth/web/logout').flush({}, { status: 500, statusText: 'Error' });
    await rejection;
    expect(facade.sessionId()).toBe('active');
    expect(facade.error()).toBeTruthy();
    expect(facade.isLoading()).toBe(false);
  });
});
