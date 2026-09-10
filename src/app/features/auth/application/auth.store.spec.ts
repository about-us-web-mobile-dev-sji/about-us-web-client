import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import type { AuthRepository } from '../domain/ports/auth.repository';
import type { LoginResponse } from '../domain/models/authenticated-user.model';
import { AUTH_REPOSITORY } from './auth.tokens';
import { AuthStore } from './auth.store';

const command = { email: 'user@example.com', password: 'password' };
const session: LoginResponse = {
  user: { id: '1', email: command.email, firstName: '  ', lastName: null, globalRole: 'USER' },
  sessionId: 'session',
};

function createStore(repository: AuthRepository) {
  TestBed.configureTestingModule({
    providers: [{ provide: AUTH_REPOSITORY, useValue: repository }],
  });
  return TestBed.inject(AuthStore);
}

describe('AuthStore with a non-HTTP repository', () => {
  it('accepts an absent session without an error', async () => {
    const store = createStore({
      login: async () => session,
      restoreSession: async () => null,
      logout: async () => undefined,
    });
    await store.initialize();
    expect(store.isInitialized()).toBe(true);
    expect(store.isAuthenticated()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('serializes restoration, login and logout in request order', async () => {
    const calls: string[] = [];
    let finishRestore!: (value: LoginResponse | null) => void;
    const restoration = new Promise<LoginResponse | null>((resolve) => {
      finishRestore = resolve;
    });
    const store = createStore({
      restoreSession: () => {
        calls.push('restore');
        return restoration;
      },
      login: async () => {
        calls.push('login');
        return session;
      },
      logout: async () => {
        calls.push('logout');
      },
    });
    const initialized = store.initialize();
    const loggedIn = store.login(command);
    const loggedOut = store.logout();
    await Promise.resolve();
    expect(calls).toEqual(['restore']);
    finishRestore(null);
    await Promise.all([initialized, loggedIn, loggedOut]);
    expect(calls).toEqual(['restore', 'login', 'logout']);
    expect(store.session()).toBeNull();
    expect(store.isLoading()).toBe(false);
  });

  it('does not refresh over a login queued before initialization', async () => {
    const restoreSession = vi.fn(async () => null);
    const store = createStore({
      login: async () => session,
      restoreSession,
      logout: async () => undefined,
    });
    await Promise.all([store.login(command), store.initialize()]);
    expect(restoreSession).not.toHaveBeenCalled();
    expect(store.session()).toEqual(session);
    expect(store.userName()).toBe(command.email);
  });

  it('allows another operation after a failed login', async () => {
    const login = vi
      .fn<AuthRepository['login']>()
      .mockRejectedValueOnce(new Error('Unavailable'))
      .mockResolvedValueOnce(session);
    const store = createStore({
      login,
      restoreSession: async () => null,
      logout: async () => undefined,
    });
    await expect(store.login(command)).rejects.toThrow('Unavailable');
    expect(store.error()).toBeTruthy();
    await store.login(command);
    expect(store.session()).toEqual(session);
    expect(store.error()).toBeNull();
    expect(store.isLoading()).toBe(false);
  });
});
