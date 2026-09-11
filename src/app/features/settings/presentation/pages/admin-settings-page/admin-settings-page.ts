import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ChangePasswordForm } from '../../../../auth/presentation/components/change-password-form/change-password-form';
import {
  ChangePasswordCommand,
  PasswordChangeError,
  PasswordChangeFailure,
} from '../../../../auth/domain/models/password-change.model';
import { Component, inject, signal, viewChild } from '@angular/core';
import { AuthFacade } from '../../../../auth/application/auth.facade';

@Component({
  selector: 'app-admin-settings-page',
  imports: [ChangePasswordForm, ButtonDirective, InputTextModule],
  template: `
    <h1>Paramètres</h1>
    <p>Informations du compte administrateur connecté.</p>
    @if (auth.user(); as user) {
      <section aria-labelledby="account-title">
        <h2 id="account-title">Mon compte</h2>
        <dl>
          <dt>Nom</dt>
          <dd>{{ auth.userName() }}</dd>
          <dt>Adresse email</dt>
          <dd>{{ user.email }}</dd>
          <dt>Rôle</dt>
          <dd>Super administrateur</dd>
        </dl>
      </section>
    }
    @if (auth.isSuperAdmin()) {
      <section aria-labelledby="password-title">
        <h2 id="password-title">Mot de passe</h2>
        <button
          pButton
          type="button"
          class="password-edit-button"
          severity="secondary"
          [attr.aria-expanded]="isEditingPassword()"
          aria-controls="password-editor"
          [disabled]="auth.isLoading()"
          (click)="togglePasswordEditor()"
        >
          {{ isEditingPassword() ? 'Annuler' : 'Modifier le mot de passe' }}
        </button>
        @if (!isEditingPassword()) {
          <input
            pInputText
            type="text"
            value="••••••••••••"
            readonly
            aria-label="Mot de passe masqué"
            class="password-preview"
          />
        }
        <div id="password-editor">
          @if (isEditingPassword()) {
            <app-change-password-form
              [isLoading]="auth.isLoading()"
              (submitPassword)="changePassword($event)"
            />
            @if (passwordError()) {
              <p role="alert">{{ passwordError() }}</p>
            }
          }
        </div>
      </section>
    }
  `,
  styles: `
    .password-edit-button {
      margin-bottom: 1rem;
    }
    .password-preview {
      display: block;
      width: 100%;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    p,
    dt {
      color: var(--p-text-muted-color);
    }
    section {
      margin-top: 2rem;
      padding: 1.5rem;
      border: 1px solid var(--p-content-border-color);
      border-radius: 0.75rem;
      max-width: 40rem;
    }
    h2 {
      font-weight: 600;
      margin-bottom: 1rem;
    }
    dl {
      display: grid;
      gap: 0.5rem;
    }
    dd {
      margin: 0 0 1rem;
      overflow-wrap: anywhere;
    }
  `,
})
export class AdminSettingsPage {
  readonly auth = inject(AuthFacade);
  readonly isEditingPassword = signal(false);
  readonly passwordError = signal<string | null>(null);
  private readonly router = inject(Router);
  private readonly passwordForm = viewChild(ChangePasswordForm);

  togglePasswordEditor(): void {
    if (this.auth.isLoading()) return;
    this.passwordForm()?.reset();
    this.passwordError.set(null);
    this.isEditingPassword.update((editing) => !editing);
  }

  async changePassword(command: ChangePasswordCommand): Promise<void> {
    if (this.auth.isLoading()) return;
    this.passwordError.set(null);
    try {
      await this.auth.changePassword(command);
    } catch (error) {
      const messages: Record<PasswordChangeFailure, string> = {
        invalid:
          'Le nouveau mot de passe ne respecte pas les règles ou reprend le mot de passe actuel.',
        unauthorized:
          'Le mot de passe actuel est incorrect ou ta session a expiré. Vérifie-le ou reconnecte-toi.',
        forbidden:
          'Modification refusée. Un compte super administrateur actif et une origine autorisée sont nécessaires.',
        conflict: 'Le mot de passe a été modifié entre-temps. Reconnecte-toi avant de réessayer.',
        unavailable: 'Impossible de modifier le mot de passe pour le moment. Réessaie plus tard.',
      };
      this.passwordError.set(
        messages[error instanceof PasswordChangeError ? error.reason : 'unavailable'],
      );
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
