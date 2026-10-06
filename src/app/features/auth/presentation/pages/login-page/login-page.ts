import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { LoginCommand } from '../../../domain/ports/auth.repository';
import { AuthFacade } from '../../../application/auth.facade';
import { LoginForm } from '../../components/login-form/login-form';
import { GoogleSignInButton } from '../../components/google-sign-in-button/google-sign-in-button';
import { postLoginUrl } from '../../../application/auth-navigation';
import { errorMessage } from '../../../../../core/i18n/error-messages';

@Component({
  imports: [LoginForm, GoogleSignInButton],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly query = inject(ActivatedRoute).snapshot.queryParamMap;
  private readonly router = inject(Router);
  readonly auth = inject(AuthFacade);
  readonly passwordChanged = this.query.get('passwordChanged') === '1';
  readonly returnUrl = this.query.get('returnUrl');
  /** Error code handed back by the Google redirect (?error=CODE). */
  readonly redirectErrorCode = this.query.get('error');
  readonly errorMessage = errorMessage;

  async handleSubmit(command: LoginCommand): Promise<void> {
    try {
      await this.auth.login(command);
    } catch {
      return; // The store exposes the error code, rendered by the template.
    }
    const role = this.auth.isSuperAdmin() ? 'SUPER_ADMIN' : 'USER';
    await this.router.navigateByUrl(postLoginUrl(role, this.returnUrl), {
      replaceUrl: true,
    });
  }
}
