import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credentialsInterceptor } from '../../../core/http/credentials.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../../app.routes';
import { API_BASE_URL } from '../../../core/config/api.config';
import { AUTH_REPOSITORY_PROVIDER } from '../infrastructure/repositories/http-auth.repository';
import { AuthFacade } from './auth.facade';
import { AdminSettingsPage } from '../../settings/presentation/pages/admin-settings-page/admin-settings-page';
import { By } from '@angular/platform-browser';

const command = { currentPassword: 'old-password', newPassword: 'new-password-123' };

describe('Change password flow', () => {
  let auth: AuthFacade;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([credentialsInterceptor])),
        provideHttpClientTesting(),
        AUTH_REPOSITORY_PROVIDER,
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    auth = TestBed.inject(AuthFacade);
    http = TestBed.inject(HttpTestingController);
    const initialization = auth.initialize();
    await Promise.resolve();
    http.expectOne('/api/auth/web/refresh').flush({
      user: {
        id: '1',
        email: 'admin@example.com',
        firstName: null,
        lastName: null,
        globalRole: 'SUPER_ADMIN',
      },
      sessionId: 'session',
    });
    await initialization;
  });
  afterEach(() => {
    // The settings page also lists the devices (sessions panel): not under test here.
    http.match('/api/auth/sessions').forEach((request) => request.flush([]));
    http.verify();
  });

  it('hides the password fields until editing and clears them on cancellation', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s/settings');
    const root = harness.routeNativeElement!;
    expect(root.querySelector('app-change-password-form')).toBeNull();
    expect((root.querySelector('.password-preview') as HTMLInputElement).readOnly).toBe(true);
    const button = root.querySelector('.password-edit-button') as HTMLButtonElement;
    button.click();
    harness.detectChanges();
    expect(root.querySelector('app-change-password-form')).toBeTruthy();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    const input = root.querySelector('#change-currentPassword') as HTMLInputElement;
    input.value = 'temporary-value';
    input.dispatchEvent(new Event('input'));
    button.click();
    harness.detectChanges();
    expect(root.querySelector('app-change-password-form')).toBeNull();
    button.click();
    harness.detectChanges();
    expect((root.querySelector('#change-currentPassword') as HTMLInputElement).value).toBe('');
    http.expectNone('/api/auth/password');
  });

  it('clears auth on 204 and displays confirmation at login without calling logout', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s/settings');
    const page = harness.routeDebugElement!.query(By.directive(AdminSettingsPage))
      .componentInstance as AdminSettingsPage;
    const change = page.changePassword(command);
    await Promise.resolve();
    const request = http.expectOne('/api/auth/password');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.withCredentials).toBe(true);
    expect(request.request.body).toEqual(command);
    request.flush(null, { status: 204, statusText: 'No Content' });
    await change;
    expect(auth.session()).toBeNull();
    expect(auth.isAuthenticated()).toBe(false);
    expect(auth.isLoading()).toBe(false);
    expect(TestBed.inject(Router).url).toBe('/login?passwordChanged=1');
    harness.detectChanges();
    expect(harness.routeNativeElement?.textContent).toContain('Mot de passe modifié');
    http.expectNone('/api/auth/web/logout');
  });

  for (const [status, code, message] of [
    [400, 'INVALID_PASSWORD', 'ne respecte pas'],
    [401, 'INVALID_CREDENTIALS', 'actuel est incorrect'],
    [403, 'PASSWORD_CHANGE_FORBIDDEN', 'ne peux pas modifier'],
    [409, 'PASSWORD_CHANGE_CONFLICT', 'entre-temps'],
    [500, 'INTERNAL_SERVER_ERROR', 'Réessaie plus tard'],
  ] as const) {
    it(`displays ${code} (HTTP ${status}) without clearing the current session`, async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/s/settings');
      const page = harness.routeDebugElement!.query(By.directive(AdminSettingsPage))
        .componentInstance as AdminSettingsPage;
      const change = page.changePassword(command);
      await Promise.resolve();
      http
        .expectOne('/api/auth/password')
        .flush({ code, message: code, details: null }, { status, statusText: 'Error' });
      await change;
      expect(page.passwordError()).toContain(message);
      expect(auth.sessionId()).toBe('session');
      expect(auth.isLoading()).toBe(false);
      expect(TestBed.inject(Router).url).toBe('/s/settings');
    });
  }
});
