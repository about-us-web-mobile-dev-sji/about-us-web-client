import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade, LogoutButton, SessionsPanel } from '../../../../auth';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, LogoutButton, SessionsPanel],
  template: `
    <section class="mx-auto max-w-3xl p-8">
      <header class="mb-4 flex items-center justify-between gap-4">
        <h1 class="text-3xl font-semibold">Bienvenue, {{ auth.userName() }}</h1>
        <app-logout-button />
      </header>
      <p class="mb-6">Vous êtes connecté à votre espace About Us.</p>
      @if (auth.isSuperAdmin()) {
        <a routerLink="/s/home" class="text-blue-700 underline">Accéder à l’administration</a>
      }
      <app-sessions-panel />
    </section>
  `,
})
export class HomePage {
  readonly auth = inject(AuthFacade);
}
