import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { App } from './app';
import { appConfig } from './app.config';
import { AuthStore } from './features/auth/application/auth.store';
import { AuthFacade } from './features/auth/application/auth.facade';

describe('App routing configuration', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        ...appConfig.providers,
        { provide: AuthStore, useValue: { initialize: async () => undefined } },
        { provide: AuthFacade, useValue: { isLoading: signal(false), error: signal(null) } },
      ],
    }).compileComponents();
  });

  it('renders the login route with the actual application providers', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl('/login');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-login-page')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[formControlName="email"]')).toBeTruthy();
  });
});
