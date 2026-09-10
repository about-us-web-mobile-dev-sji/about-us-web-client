import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import type { LoginResponse } from '../domain/models/authenticated-user.model';
import type { AuthState } from './auth-state.model';
import type { LoginCommand } from '../domain/ports/auth.repository';
import { AUTH_SERVICE } from './auth.tokens';
import { AuthOperationQueue } from './auth-operation-queue';

const initialState: AuthState = {
  session: null,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ session }) => ({
    user: computed(() => session()?.user ?? null),
    sessionId: computed(() => session()?.sessionId ?? null),
    isAuthenticated: computed(() => session() !== null),
    isSuperAdmin: computed(() => session()?.user.globalRole === 'SUPER_ADMIN'),
    userFirstName: computed(() => session()?.user.firstName ?? ''),
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
    let initialization: Promise<void> | undefined;
    const operations = new AuthOperationQueue();

    return {
      initialize(): Promise<void> {
        if (initialization) return initialization;
        if (store.isInitialized()) return Promise.resolve();
        initialization = operations.enqueue(async () => {
          if (store.isInitialized()) return;
          patchState(store, { isLoading: true, error: null });
          try {
            const session = await authService.restoreSession();
            patchState(store, { session });
          } catch {
            patchState(store, {
              session: null,
              error: 'Impossible de restaurer la session. Réessaie de te connecter.',
            });
          } finally {
            patchState(store, { isLoading: false, isInitialized: true });
          }
        });
        return initialization;
      },
      login(command: LoginCommand): Promise<LoginResponse> {
        return operations.enqueue(async () => {
          patchState(store, { isLoading: true, error: null });
          try {
            const session = await authService.login(command);
            patchState(store, { session });
            console.log(session);
            return session;
          } catch (error) {
            patchState(store, {
              error: 'Connexion impossible. Vérifie tes identifiants et réessaie.',
            });
            throw error;
          } finally {
            patchState(store, { isLoading: false, isInitialized: true });
          }
        });
      },
      logout(): Promise<void> {
        return operations.enqueue(async () => {
          patchState(store, { isLoading: true, error: null });
          try {
            await authService.logout();
            patchState(store, { session: null, isInitialized: true });
          } catch (error) {
            patchState(store, { error: 'Déconnexion impossible. Réessaie.' });
            throw error;
          } finally {
            patchState(store, { isLoading: false });
          }
        });
      },
    };
  }),
);
