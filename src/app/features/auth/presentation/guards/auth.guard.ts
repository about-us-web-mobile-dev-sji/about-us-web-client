import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../application/auth.facade';
import type { AuthenticatedUser } from '../../domain/models/authenticated-user.model';

type GlobalRole = AuthenticatedUser['globalRole'];

export function authGuard(allowedRoles: readonly GlobalRole[] = []): CanActivateFn {
  return async (_route, state) => {
    const auth = inject(AuthFacade);
    const router = inject(Router);
    await auth.initialize();

    const user = auth.user();
    if (!user) {
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.globalRole)) {
      return router.createUrlTree(['/forbidden']);
    }
    return true;
  };
}
