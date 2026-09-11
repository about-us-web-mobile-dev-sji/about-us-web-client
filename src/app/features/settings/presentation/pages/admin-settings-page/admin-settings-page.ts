import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../../../auth/application/auth.facade';

@Component({
  selector: 'app-admin-settings-page',
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
  `,
  styles: `
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
}
