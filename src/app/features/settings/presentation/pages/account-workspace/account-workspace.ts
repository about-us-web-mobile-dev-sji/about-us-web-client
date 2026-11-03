import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';

/**
 * Paramètres du compte connecté : une barre latérale dédiée (retour, identité, onglets)
 * remplace la navigation principale, comme pour l'espace d'une école.
 */
@Component({
  selector: 'app-account-workspace',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonDirective, ButtonIcon, ButtonLabel],
  host: { class: 'block flex-1 min-h-0' },
  template: `
    <div class="au-workspace grid h-full">
      <aside class="au-subnav" aria-label="Paramètres du compte">
        <a pButton routerLink="/s/home" [text]="true" severity="secondary" class="mb-2 self-start">
          <i pButtonIcon class="pi pi-arrow-left"></i>
          <span pButtonLabel>Retour</span>
        </a>
        <p class="au-subnav-title">Paramètres du compte</p>
        <nav class="grid gap-0.5">
          @for (tab of tabs; track tab.path) {
            <a class="au-subnav-tab" [routerLink]="tab.path" routerLinkActive="is-active" ariaCurrentWhenActive="page">
              <i [class]="tab.icon" aria-hidden="true"></i>
              <span>{{ tab.label }}</span>
            </a>
          }
        </nav>
      </aside>
      <section class="au-scroll-thin min-w-0 overflow-y-auto px-[clamp(1rem,3vw,2rem)] py-8">
        <div class="mx-auto max-w-[1110px]"><router-outlet /></div>
      </section>
    </div>
  `,
})
export class AccountWorkspace {
  readonly tabs = [
    { label: 'Profil', icon: 'pi pi-user', path: '/s/account/profile' },
    { label: 'Sécurité', icon: 'pi pi-shield', path: '/s/account/security' },
  ];
}

