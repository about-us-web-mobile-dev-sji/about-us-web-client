import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../../../auth/application/auth.facade';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-3xl p-8">
      <h1 class="mb-4 text-3xl font-semibold">Bienvenue, {{ auth.userName() }}</h1>
      <p class="mb-6">Vous êtes connecté à votre espace About Us.</p>
      @if (auth.isSuperAdmin()) {
        <a routerLink="/s/home" class="text-blue-700 underline">Accéder à l’administration</a>
      }
    </section>
  `,
})
export class HomePage {
  readonly auth = inject(AuthFacade);
}
