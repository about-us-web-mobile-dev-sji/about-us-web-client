import { Component, inject, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '../../../application/auth.facade';
import { LOGIN_PATH, postLoginUrl } from '../../../application/auth-navigation';

/**
 * UC-25. Landing page after Google: the backend has set the session cookies
 * (or passed ?error=CODE). The app initializer already restored the session
 * on this full page load, so only the redirection remains.
 */
@Component({
  selector: 'app-auth-callback-page',
  template: `<p class="p-8" role="status" i18n="@@auth.callback.pending">Connexion en cours…</p>`,
})
export class AuthCallbackPage implements OnInit {
  private readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly query = inject(ActivatedRoute).snapshot.queryParamMap;

  async ngOnInit(): Promise<void> {
    await this.auth.initialize();
    const error = this.query.get('error');
    const returnUrl = this.query.get('returnUrl');
    const user = this.auth.user();
    if (error || !user) {
      await this.router.navigate([LOGIN_PATH], {
        queryParams: { error: error ?? 'GOOGLE_LOGIN_FAILED', returnUrl },
        replaceUrl: true,
      });
      return;
    }
    await this.router.navigateByUrl(postLoginUrl(user.globalRole, returnUrl), { replaceUrl: true });
  }
}
