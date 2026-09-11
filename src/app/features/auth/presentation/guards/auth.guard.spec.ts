import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { routes } from '../../../../app.routes';
import { AuthFacade } from '../../application/auth.facade';
import type { AuthenticatedUser } from '../../domain/models/authenticated-user.model';

const user: AuthenticatedUser = {
  id: '1',
  email: 'user@example.com',
  firstName: null,
  lastName: null,
  globalRole: 'USER',
};

describe('Protected application routes', () => {
  const currentUser = signal<AuthenticatedUser | null>(null);
  const initialize = vi.fn<() => Promise<void>>();

  beforeEach(() => {
    currentUser.set(null);
    initialize.mockReset().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        {
          provide: AuthFacade,
          useValue: {
            initialize,
            user: currentUser,
            isLoading: signal(false),
            error: signal(null),
            userName: () => currentUser()?.email ?? '',
            isSuperAdmin: () => currentUser()?.globalRole === 'SUPER_ADMIN',
          },
        },
      ],
    });
  });

  it('redirects an anonymous visitor to login with the requested destination', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s/home');
    const router = TestBed.inject(Router);
    expect(router.parseUrl(router.url).queryParams['returnUrl']).toBe('/s/home');
    expect(router.url.split('?')[0]).toBe('/login');
  });

  it('denies a regular user access to administration', async () => {
    currentUser.set(user);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s/home');
    expect(TestBed.inject(Router).url).toBe('/forbidden');
  });

  it('allows a super administrator', async () => {
    currentUser.set({ ...user, globalRole: 'SUPER_ADMIN' });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s/home');
    expect(TestBed.inject(Router).url).toBe('/s/home');
  });

  it('waits for restoration before deciding access and resolves the root route', async () => {
    initialize.mockImplementation(async () => {
      currentUser.set(user);
    });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');
    expect(initialize).toHaveBeenCalled();
    expect(TestBed.inject(Router).url).toBe('/home');
  });
  it('keeps the layout while navigating to settings and toggles the sidebar', async () => {
    currentUser.set({ ...user, globalRole: 'SUPER_ADMIN' });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s');
    expect(TestBed.inject(Router).url).toBe('/s/home');
    const layout = harness.routeNativeElement;
    const trigger = layout!.querySelector('[pSidebarTrigger]') as HTMLButtonElement;
    const expanded = trigger.getAttribute('aria-expanded');
    trigger.click();
    harness.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).not.toBe(expanded);
    await harness.navigateByUrl('/s/settings');
    expect(harness.routeNativeElement).toBe(layout);
    expect(layout!.querySelector('h1')?.textContent).toBe('Paramètres');
    expect(layout!.querySelector('a[href="/s/settings"]')?.getAttribute('aria-current')).toBe(
      'page',
    );
  });

  it('checks permissions again when navigating between admin children', async () => {
    currentUser.set({ ...user, globalRole: 'SUPER_ADMIN' });
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/s/home');
    currentUser.set(user);
    await harness.navigateByUrl('/s/settings');
    expect(TestBed.inject(Router).url).toBe('/forbidden');
  });
});
