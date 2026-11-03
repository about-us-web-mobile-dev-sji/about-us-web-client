import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NotifyService } from '../../../../../core/notifications/notify.service';
import { AuthFacade, ChangePasswordForm, SessionsPanel, type ChangePasswordCommand } from '../../../../auth';

/** Wording specific to this form, on top of the shared error messages. */
const PASSWORD_ERROR_OVERRIDES = {
  INVALID_CREDENTIALS: $localize`:@@settings.password.INVALID_CREDENTIALS:Le mot de passe actuel est incorrect.`,
};

/** Sécurité du compte connecté : mot de passe et sessions ouvertes. */
@Component({
  selector: 'app-account-security-page',
  imports: [CardModule, ChangePasswordForm, SessionsPanel, ButtonDirective],
  template: `
    <div class="au-page">
      <header class="au-page-head">
        <div>
        <h1 class="au-page-title">Sécurité</h1>
        <p class="m-0 mt-1 text-sm text-muted-color">Votre mot de passe et les appareils connectés à votre compte.</p>
        </div>
      </header>
      <div class="au-settings">
        @if (auth.isSuperAdmin()) {
          <section class="au-settings-section" aria-labelledby="password-title">
            <div class="au-settings-intro">
              <h2 id="password-title">Mot de passe</h2>
              <p>Après le changement, vous devrez vous reconnecter.</p>
            </div>
            <p-card class="au-flush">
              <div class="au-settings-item">
                @if (!isEditingPassword()) {
                  <input type="text" value="••••••••••••" readonly aria-label="Mot de passe masqué" class="password-preview au-password-preview" />
                } @else {
                  <span class="text-muted-color">Saisissez le mot de passe actuel, puis le nouveau.</span>
                }
                <button
                  pButton
                  type="button"
                  class="password-edit-button"
                  severity="secondary"
                  [outlined]="true"
                  size="small"
                  [attr.aria-expanded]="isEditingPassword()"
                  aria-controls="password-editor"
                  [disabled]="auth.isLoading()"
                  (click)="togglePasswordEditor()"
                >
                  {{ isEditingPassword() ? 'Annuler' : 'Modifier le mot de passe' }}
                </button>
              </div>
              <div id="password-editor">
                @if (isEditingPassword()) {
                  <div class="border-t border-surface px-6 py-5">
                    <app-change-password-form [isLoading]="auth.isLoading()" (submitPassword)="changePassword($event)" />
                  </div>
                }
              </div>
            </p-card>
          </section>
        }
        <section class="au-settings-section" aria-labelledby="sessions-title">
          <div class="au-settings-intro">
            <h2 id="sessions-title">Sessions</h2>
            <p>Les appareils connectés à votre compte. Révoquez ceux que vous ne reconnaissez pas.</p>
          </div>
          <app-sessions-panel [embedded]="true" />
        </section>
      </div>
    </div>
  `,
})
export class AccountSecurityPage {
  readonly auth = inject(AuthFacade);
  readonly isEditingPassword = signal(false);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);
  private readonly passwordForm = viewChild(ChangePasswordForm);

  togglePasswordEditor(): void {
    if (this.auth.isLoading()) return;
    this.passwordForm()?.reset();
    this.isEditingPassword.update((editing) => !editing);
  }

  async changePassword(command: ChangePasswordCommand): Promise<void> {
    if (this.auth.isLoading()) return;
    try {
      await this.auth.changePassword(command);
    } catch (error) {
      this.notify.fromError(error, 'Mot de passe non modifié', PASSWORD_ERROR_OVERRIDES);
      return;
    } finally {
      this.passwordForm()?.reset();
    }
    await this.router.navigate(['/login'], {
      queryParams: { passwordChanged: '1' },
      replaceUrl: true,
    });
  }
}
