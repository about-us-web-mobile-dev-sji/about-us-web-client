import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { AuthFacade } from '../../../application/auth.facade';
import { LOGIN_PATH } from '../../../application/auth-navigation';
import { NotifyService } from '../../../../../core/notifications/notify.service';

@Component({
  host: { class: 'inline-flex flex-col gap-1' },
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
  `,
})
export class LogoutButton {
  readonly text = input(false);
  readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);

  async logout(): Promise<void> {
    try {
      await this.auth.logout();
    } catch (error) {
      this.notify.fromError(error, 'Déconnexion impossible');
      return;
    }
    await this.router.navigateByUrl(LOGIN_PATH, { replaceUrl: true });
  }
}
