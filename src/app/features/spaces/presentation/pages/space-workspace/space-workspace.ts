import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { SpaceFacade } from '../../../application/space.facade';
import type { Space } from '../../../domain/models/space.model';

/**
 * Espace ouvert depuis l'organigramme : une seconde barre latérale, collée à celle de l'école,
 * avec le retour à l'organigramme et un onglet par sujet (Ressources, Membres).
 */
@Component({
  selector: 'app-space-workspace',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonDirective, ButtonIcon, ButtonLabel],
  host: { class: 'flex min-h-0 flex-1' },
  template: `
    <div class="au-space-layout">
      <aside class="au-subnav au-space-nav" aria-label="Navigation de l'espace">
        <a pButton [routerLink]="['/s/schools', schoolId()]" [text]="true" severity="secondary" class="mb-2 self-start">
          <i pButtonIcon class="pi pi-arrow-left"></i>
          <span pButtonLabel>Organigramme</span>
        </a>
        <div class="au-space-id">
          <i class="pi pi-sitemap" aria-hidden="true"></i>
          <span class="au-space-name" [title]="space()?.name ?? ''">{{ space()?.name ?? '…' }}</span>
        </div>
        <nav class="grid gap-0.5">
          @for (tab of tabs(); track tab.path) {
            <a class="au-subnav-tab" [routerLink]="tab.path" routerLinkActive="is-active" ariaCurrentWhenActive="page">
              <i [class]="tab.icon" aria-hidden="true"></i>
              <span>{{ tab.label }}</span>
            </a>
          }
        </nav>
      </aside>
      <section class="au-scroll-thin min-w-0 overflow-y-auto px-[clamp(1rem,3vw,2rem)] py-8">
        <div class="mx-auto max-w-[1110px]">
          @for (id of [spaceId()]; track id) {
            <router-outlet />
          }
        </div>
      </section>
    </div>
  `,
})
export class SpaceWorkspace implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(SpaceFacade);

  readonly schoolId = toSignal(this.route.paramMap.pipe(map((p) => p.get('schoolId') ?? '')), { initialValue: '' });
  readonly spaceId = toSignal(this.route.paramMap.pipe(map((p) => p.get('spaceId') ?? '')), { initialValue: '' });
  readonly spaces = signal<Space[]>([]);
  readonly space = computed(() => this.spaces().find((space) => space.id === this.spaceId()) ?? null);

  readonly tabs = computed(() => {
    const base = ['/s/schools', this.schoolId(), 'spaces', this.spaceId()].join('/');
    return [
      { label: 'Ressources', icon: 'pi pi-folder', path: `${base}/resources` },
      { label: this.space()?.memberDesignation?.plural || 'Membres', icon: 'pi pi-users', path: `${base}/members` },
    ];
  });

  async ngOnInit(): Promise<void> {
    try {
      this.spaces.set(await this.facade.getSchoolTree(this.schoolId()));
    } catch {
      this.spaces.set([]);
    }
  }
}
