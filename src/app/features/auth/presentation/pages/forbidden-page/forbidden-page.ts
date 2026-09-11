import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden-page',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-3xl p-8">
      <h1 class="mb-4 text-3xl font-semibold">Accès refusé</h1>
      <p class="mb-6">
        Votre compte ne dispose pas des permissions nécessaires pour accéder à cette page.
      </p>
      <a routerLink="/home" class="text-blue-700 underline">Retour à l’accueil</a>
    </section>
  `,
})
export class ForbiddenPage {}
