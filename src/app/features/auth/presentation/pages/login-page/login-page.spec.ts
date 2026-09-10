import { vi } from 'vitest';
import { signal } from '@angular/core';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { AuthFacade } from '../../../application/auth.facade';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login-page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  const auth = {
    isLoading: signal(false),
    error: signal(null),
    isSuperAdmin: signal(false),
    login: vi.fn(),
  };
  let returnUrl: string | null = null;

  beforeEach(async () => {
    returnUrl = null;
    auth.isSuperAdmin.set(false);
    auth.login.mockReset().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter([]),
        { provide: AuthFacade, useValue: auth },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              get queryParamMap() {
                return convertToParamMap(returnUrl ? { returnUrl } : {});
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  for (const [admin, requested, expected] of [
    [false, null, '/home'],
    [true, null, '/s/home'],
    [true, '/home', '/s/home'],
    [true, '/s/home', '/s/home'],
    [false, '/s/home', '/home'],
    [false, 'https://example.com', '/home'],
    [true, '/login', '/s/home'],
  ] as const) {
    it(`redirects admin=${admin}, returnUrl=${requested} to ${expected}`, async () => {
      auth.isSuperAdmin.set(admin);
      returnUrl = requested;
      const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
      await component.handleSubmit({ email: 'user@example.com', password: 'password' });
      expect(navigate).toHaveBeenCalledWith(expected, { replaceUrl: true });
    });
  }

  it('does not navigate when login fails', async () => {
    auth.login.mockRejectedValue(new Error('Invalid credentials'));
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    await component.handleSubmit({ email: 'user@example.com', password: 'password' });
    expect(navigate).not.toHaveBeenCalled();
  });
});
