import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '../../../../../core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Sidebar } from '@primeicons/angular/sidebar';
import { SchoolFacade } from '../../../application/school.facade';

/**
 * Espace d'une école, sur le modèle des domaines de hPanel : une seconde barre latérale
 * (sélecteur d'école + sous-onglets) et le contenu de l'onglet à côté.
 */
@Component({
  selector: 'app-school-workspace',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, SelectModule, ButtonDirective, ButtonIcon, ButtonLabel, Sidebar],
  templateUrl: './school-workspace.html',
  host: { class: 'block flex-1 min-h-0' },
})
export class SchoolWorkspace implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly facade = inject(SchoolFacade);

  readonly schoolId = toSignal(this.route.paramMap.pipe(map((params) => params.get('schoolId') ?? '')), {
    initialValue: '',
  });
  /** L'onglet actif est un espace (route `data: { stuck: true }`) : il occupe toute la zone, sans marges. */
  readonly stuck = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.route.firstChild?.snapshot.data['stuck'] === true),
    ),
    { initialValue: false },
  );
  readonly school = computed(() => this.facade.schools().find((item) => item.id === this.schoolId()));

  readonly tabs = [
    { label: 'Espaces', icon: 'pi pi-sitemap', path: [] as string[], exact: true },
    { label: 'Membres', icon: 'pi pi-users', path: ['members'], exact: false },
    { label: 'Invitations', icon: 'pi pi-envelope', path: ['invitations'], exact: false },
    { label: 'Paramètres', icon: 'pi pi-cog', path: ['settings'], exact: false },
  ];

  /** Barre réduite aux icônes, comme la navigation principale. */
  readonly collapsed = signal(false);

  toggleCollapsed(): void {
    this.collapsed.update((collapsed) => !collapsed);
  }

  ngOnInit(): void {
    if (this.facade.schools().length === 0) void this.facade.loadSchools();
  }

  link(path: string[]): string[] {
    return ['/s/schools', this.schoolId(), ...path];
  }

  /** Change d'école en restant sur le même onglet. */
  switchSchool(schoolId: string): void {
    if (!schoolId || schoolId === this.schoolId()) return;
    const path = this.router.url.split(/[?#]/)[0].split('/');
    const tab = path.slice(4);
    void this.router.navigate(['/s/schools', schoolId, ...tab]);
  }
}
