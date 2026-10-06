import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import type { ChangePasswordCommand } from '../domain/models/password-change.model';
import type { LoginResponse } from '../domain/models/authenticated-user.model';
import type { ActiveSession } from '../domain/models/active-session.model';
import type { LoginCommand } from '../domain/ports/auth.repository';
import { AppError, CLIENT_ERROR_CODES, errorCodeOf } from '../../../core/errors/app-error';
import type { AuthState } from './auth-state.model';
import { AUTH_SERVICE } from './auth.tokens';
import { AuthOperationQueue } from './auth-operation-queue';

const initialState: AuthState = {
  session: null,
  isLoading: false,
  isInitialized: false,
  errorCode: null,
};

/** Internal state of the auth feature. Other features go through AuthFacade. */
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ session }) => ({
    user: computed(() => session()?.user ?? null),
    sessionId: computed(() => session()?.sessionId ?? null),
    isAuthenticated: computed(() => session() !== null),
    isSuperAdmin: computed(() => session()?.user.globalRole === 'SUPER_ADMIN'),
    userName: computed(() => {
      const user = session()?.user;
      return (
        [user?.firstName, user?.lastName]
          .map((name) => name?.trim())
          .filter(Boolean)
          .join(' ') ||
        user?.email ||
        ''
      );
    }),
  })),
  withMethods((store, authService = inject(AUTH_SERVICE)) => {
    const operations = new AuthOperationQueue();
    let initialization: Promise<void> | undefined;
    let refreshing: Promise<boolean> | undefined;

    /** Runs a session mutation in order, tracking loading state and the error code. */
    function run<T>(operation: () => Promise<T>): Promise<T> {
      return operations.enqueue(async () => {
        patchState(store, { isLoading: true, errorCode: null });
        try {
          return await operation();
        } catch (error) {
          patchState(store, { errorCode: errorCodeOf(error) });
          throw error;
        } finally {
          patchState(store, { isLoading: false, isInitialized: true });
        }
      });
    }

    return {
      /** Restores the session once at startup; never rejects. */
      initialize(): Promise<void> {
        if (store.isInitialized()) return Promise.resolve();
        initialization ??= run(async () => {
          // A login queued before startup already established the session.
          if (store.session()) return;
          patchState(store, { session: await authService.restoreSession() });
        }).catch(() => {
          patchState(store, {
            session: null,
            errorCode: CLIENT_ERROR_CODES.sessionRestoreFailed,
          });
        });
        return initialization;
      },

      login(command: LoginCommand): Promise<LoginResponse> {
        return run(async () => {
          const session = await authService.login(command);
          patchState(store, { session });
          return session;
        });
      },

      /**
       * Renews the access token after a 401 on an API call. Concurrent callers
       * share one request, so the refresh token is rotated only once.
       * Resolves false when the session cannot be renewed.
       */
      refreshSession(): Promise<boolean> {
        refreshing ??= operations
          .enqueue(() => authService.restoreSession())
          .then(
            (session) => {
              patchState(store, { session });
              return session !== null;
            },
            () => false,
          )
          .finally(() => (refreshing = undefined));
        return refreshing;
      },

      /** Drops a session the backend no longer accepts. */
      expireSession(): void {
        if (!store.session()) return;
        patchState(store, { session: null, errorCode: CLIENT_ERROR_CODES.sessionExpired });
      },

      changePassword(command: ChangePasswordCommand): Promise<void> {
        return run(async () => {
          if (!store.isSuperAdmin()) throw new AppError('PASSWORD_CHANGE_FORBIDDEN', 403);
          await authService.changePassword(command);
          // The backend has revoked every session and cleared the cookies.
          patchState(store, { session: null });
        });
      },

      /** UC-21. Read only: the list is page state, not session state. */
      listSessions(): Promise<ActiveSession[]> {
        return authService.listSessions();
      },

      /** UC-21. Revoking the session of this browser signs it out. */
      revokeSession(session: ActiveSession): Promise<void> {
        return run(async () => {
          await authService.revokeSession(session.id);
          if (session.current) patchState(store, { session: null });
        });
      },

      /** UC-22. The backend revokes every session and clears the cookies. */
      logoutEverywhere(): Promise<void> {
        return run(async () => {
          await authService.revokeAllSessions();
          patchState(store, { session: null });
        });
      },

      googleSignInUrl(returnUrl: string | null): string {
        return authService.googleSignInUrl(returnUrl);
      },

      logout(): Promise<void> {
        return run(async () => {
          await authService.logout();
          patchState(store, { session: null });
        });
      },
    };
  }),
);
