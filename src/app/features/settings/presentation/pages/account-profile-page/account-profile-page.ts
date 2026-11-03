import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AuthFacade } from '../../../../auth';

/** Informations personnelles du compte connecté (lecture seule : pas encore de route de modification). */
@Component({
  selector: 'app-account-profile-page',
  imports: [CardModule],
  template: `
    <div class="au-page">
      <header class="au-page-head">
        <div>
        <h1 class="au-page-title">Informations personnelles</h1>
        <p class="m-0 mt-1 text-sm text-muted-color">Les informations de votre compte sur la plateforme.</p>
        </div>
      </header>
      @if (auth.user(); as user) {
        <div class="au-settings">
          <section class="au-settings-section" aria-labelledby="identity-title">
            <div class="au-settings-intro">
              <h2 id="identity-title">Identité</h2>
              <p>Votre nom tel qu'il apparaît aux autres administrateurs et dans les journaux.</p>
            </div>
            <p-card class="au-flush">
              <dl class="m-0">
                <div class="au-panel-row"><dt>Prénom</dt><dd>{{ user.firstName || '—' }}</dd><span aria-hidden="true"></span></div>
                <div class="au-panel-row"><dt>Nom</dt><dd>{{ user.lastName || '—' }}</dd><span aria-hidden="true"></span></div>
              </dl>
            </p-card>
          </section>
          <section class="au-settings-section" aria-labelledby="contact-title">
            <div class="au-settings-intro">
              <h2 id="contact-title">Compte</h2>
              <p>L'adresse de connexion et le rôle de ce compte.</p>
            </div>
            <p-card class="au-flush">
              <dl class="m-0">
                <div class="au-panel-row"><dt>E-mail</dt><dd>{{ user.email }}</dd><span aria-hidden="true"></span></div>
                <div class="au-panel-row">
                  <dt>Rôle</dt>
                  <dd>{{ user.globalRole === 'SUPER_ADMIN' ? 'Super administrateur' : 'Utilisateur' }}</dd>
                  <span aria-hidden="true"></span>
                </div>
              </dl>
            </p-card>
          </section>
        </div>
      }
    </div>
  `,
})
export class AccountProfilePage {
  readonly auth = inject(AuthFacade);
}
