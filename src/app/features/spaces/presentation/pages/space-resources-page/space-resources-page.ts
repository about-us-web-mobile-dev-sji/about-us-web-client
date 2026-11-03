import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

/** Ressources d'un espace : la plateforme ne les gère pas encore (aucune route côté API). */
@Component({
  selector: 'app-space-resources-page',
  imports: [CardModule],
  template: `
    <div class="au-page">
      <header class="au-page-head">
        <div>
          <h1 class="au-page-title">Ressources</h1>
          <p class="m-0 mt-1 text-sm text-muted-color">Les documents et contenus partagés avec les membres de cet espace.</p>
        </div>
      </header>
      <p-card class="au-flush">
        <div class="au-empty">
          <span class="au-empty-icon" aria-hidden="true"><i class="pi pi-folder-open"></i></span>
          <h2 class="au-empty-title">Aucune ressource pour le moment</h2>
          <p class="au-empty-text">Le partage de ressources dans un espace n'est pas encore disponible sur la plateforme.</p>
        </div>
      </p-card>
    </div>
  `,
})
export class SpaceResourcesPage {}
