import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { AuthFacade } from '../../../application/auth.facade';
import { LOGIN_PATH } from '../../../application/auth-navigation';
import { errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';

@Component({
  selector: 'app-logout-button',
  imports: [ButtonDirective],
  template: `
    <button
      pButton
      type="button"
      severity="secondary"
      [text]="text()"
      size="small"
      [disabled]="auth.isLoading()"
      (click)="logout()"
      i18n="@@auth.logout"
    >
      Se déconnecter
    </button>
    @if (error(); as message) {
      <small role="alert" class="logout-error">{{ message }}</small>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .logout-error {
      color: var(--p-red-700);
    }
  `,
})
export class LogoutButton {
  readonly text = input(false);
  readonly auth = inject(AuthFacade);
  readonly error = signal<string | null>(null);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.error.set(null);
    try {
      await this.auth.logout();
    } catch (error) {
      this.error.set(errorMessage(errorCodeOf(error)));
      return;
    }
    await this.router.navigateByUrl(LOGIN_PATH, { replaceUrl: true });
  }
}
