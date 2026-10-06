import { Component, computed, inject, input } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { AuthFacade } from '../../../application/auth.facade';

/** UC-25: starts the Google sign-in (full-page navigation through the backend). */
@Component({
  selector: 'app-google-sign-in-button',
  imports: [ButtonDirective],
  template: `
    <a pButton severity="secondary" outlined class="google-button" [href]="href()" i18n="@@auth.google.continue">
      Continuer avec Google
    </a>
  `,
  styles: `
    .google-button {
      width: 100%;
      justify-content: center;
    }
  `,
})
export class GoogleSignInButton {
  /** Page to reopen once signed in. */
  readonly returnUrl = input<string | null>(null);
  private readonly auth = inject(AuthFacade);
  readonly href = computed(() => this.auth.googleSignInUrl(this.returnUrl()));
}
