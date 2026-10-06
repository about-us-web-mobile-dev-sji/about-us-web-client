import type { Router, UrlTree } from '@angular/router';
import type { AuthenticatedUser } from '../domain/models/authenticated-user.model';

export const LOGIN_PATH = '/login';
const ADMIN_AREA = '/s';
const HOME_BY_ROLE: Record<AuthenticatedUser['globalRole'], string> = {
  SUPER_ADMIN: '/s/home',
  USER: '/home',
};

/** Login page URL that brings the user back to the current page afterwards. */
export function loginRedirect(router: Router, returnUrl = router.url): UrlTree {
  const queryParams = isSafeReturnUrl(returnUrl) ? { returnUrl } : {};
  return router.createUrlTree([LOGIN_PATH], { queryParams });
}

/**
 * UC-15. Where to go after a successful login: the requested page when it is
 * an internal path of the user's own area (admin area for SUPER_ADMIN, the
 * rest of the app for USER), otherwise the home page of their role.
 */
export function postLoginUrl(
  role: AuthenticatedUser['globalRole'],
  returnUrl: string | null,
): string {
  if (returnUrl && isSafeReturnUrl(returnUrl) && canOpen(role, returnUrl)) return returnUrl;
  return HOME_BY_ROLE[role];
}

/** Only same-app absolute paths: rejects "//host", "/\host", schemes and the login page itself. */
function isSafeReturnUrl(url: string): boolean {
  return (
    url.startsWith('/') &&
    !url.startsWith('//') &&
    !url.startsWith('/\\') &&
    !url.startsWith(LOGIN_PATH)
  );
}

function canOpen(role: AuthenticatedUser['globalRole'], url: string): boolean {
  const inAdminArea = url === ADMIN_AREA || url.startsWith(`${ADMIN_AREA}/`) || url.startsWith(`${ADMIN_AREA}?`);
  return role === 'SUPER_ADMIN' ? inAdminArea : !inAdminArea;
}
