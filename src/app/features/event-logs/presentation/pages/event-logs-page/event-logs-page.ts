import { Component, DestroyRef, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonDirective, ButtonIcon, ButtonLabel, ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { EventLogsFacade } from '../../../application/event-logs.facade';
import type { EventLog } from '../../../domain/models/event-log.model';

interface FilterOption {
  label: string;
  value: string;
}

/** Nombre de journaux par page : la liste est dense, on en montre beaucoup d'un coup. */
const PAGE_SIZE = 50;
/** Mode « Live » : rechargement périodique. */
const LIVE_INTERVAL_MS = 10_000;

/**
 * Journaux d'événements, façon console de logs : filtres à gauche (groupes repliables),
 * barre de recherche et mode Live en haut, liste dense et alignée.
 */
@Component({
  selector: 'app-event-logs-page',
  templateUrl: './event-logs-page.html',
  host: { class: 'flex min-h-0 flex-1' },
  imports: [
    RouterLink,
    FormsModule,
    ButtonModule,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MessageModule,
    TableModule,
    TooltipModule,
  ],
})
export class EventLogsPage implements OnInit {
  protected readonly facade = inject(EventLogsFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly entityType = this.route.snapshot.paramMap.get('entityType') ?? '';
  protected readonly entityId = this.route.snapshot.paramMap.get('entityId') ?? '';
  /** Historique d'un seul élément (route /events/aggregate/:type/:id) : pas de filtres. */
  protected readonly isAggregate = !!(this.entityType && this.entityId);

  protected readonly entityTypes: FilterOption[] = [
    { label: 'École', value: 'school' },
    { label: 'Utilisateur', value: 'user' },
    { label: 'Espace', value: 'space' },
    { label: 'Super administrateur', value: 'super-admin' },
  ];
  protected readonly eventNames: FilterOption[] = [
    { label: 'Invitation envoyée', value: 'invitation.sent' },
    { label: 'Invitation acceptée', value: 'invitation.accepted' },
    { label: 'Rôle d’un membre modifié', value: 'school.member-role.changed' },
    { label: 'Statut d’un utilisateur modifié', value: 'user.status.updated' },
    { label: 'Utilisateur créé', value: 'user.created' },
    { label: 'Super administrateur créé', value: 'super-admin.created' },
  ];

  protected readonly selectedType = signal('');
  protected readonly search = signal('');
  /** Groupes de filtres ouverts. */
  protected readonly openGroups = signal<ReadonlySet<string>>(new Set(['type', 'event']));
  protected readonly live = signal(false);
  /** Journal ouvert dans le panneau de détail (gardé dans l'URL : ?log=…). */
  protected readonly selected = signal<EventLog | null>(null);
  protected readonly copied = signal<'id' | 'payload' | null>(null);
  protected readonly hasFilters = computed(() => !!this.selectedType() || !!this.search().trim());

  protected readonly rangeLabel = computed(() => {
    const total = this.facade.total();
    if (!total) return '0 événement';
    const first = (this.facade.page() - 1) * this.facade.limit() + 1;
    const last = Math.min(total, first + this.facade.logs().length - 1);
    return `${first}–${last} sur ${total}`;
  });

  private liveTimer: ReturnType<typeof setInterval> | undefined;
  private searchTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearInterval(this.liveTimer);
      clearTimeout(this.searchTimer);
    });
  }

  ngOnInit(): void {
    const logId = this.route.snapshot.queryParamMap.get('log');
    if (logId) void this.facade.loadDetail(logId).then((log) => this.selected.set(log));
    if (this.isAggregate) {
      void this.facade.loadAggregate(this.entityType, this.entityId);
      return;
    }
    // On repart des filtres déjà appliqués (retour depuis le détail d'un journal).
    const filters = this.facade.filters();
    this.selectedType.set(filters.entityType ?? '');
    this.search.set(filters.search ?? '');
    void this.facade.load({ page: 1, limit: PAGE_SIZE, ...filters });
  }

  protected toggleGroup(group: string): void {
    this.openGroups.update((groups) => {
      const next = new Set(groups);
      if (!next.delete(group)) next.add(group);
      return next;
    });
  }

  protected selectType(value: string): void {
    this.selectedType.set(this.selectedType() === value ? '' : value);
    this.apply();
  }

  /** Un événement se filtre par son nom, via la recherche (l'API cherche aussi dans les noms). */
  protected selectEvent(value: string): void {
    this.search.set(this.search() === value ? '' : value);
    this.apply();
  }

  protected onSearch(value: string): void {
    this.search.set(value);
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.apply(), 300);
  }

  protected reset(): void {
    this.selectedType.set('');
    this.search.set('');
    this.apply();
  }

  protected refresh(): void {
    if (this.isAggregate) void this.facade.loadAggregate(this.entityType, this.entityId);
    else void this.facade.load();
  }

  protected toggleLive(): void {
    this.live.update((live) => !live);
    clearInterval(this.liveTimer);
    if (this.live()) {
      this.refresh();
      this.liveTimer = setInterval(() => {
        if (!this.facade.isLoading()) this.refresh();
      }, LIVE_INTERVAL_MS);
    }
  }

  protected changePage(step: number): void {
    void this.facade.changePage(this.facade.page() + step);
  }

  protected select(log: EventLog): void {
    this.selected.set(this.selected()?.id === log.id ? null : log);
    this.syncUrl();
  }

  protected close(): void {
    this.selected.set(null);
    this.syncUrl();
  }

  protected hasSibling(direction: 1 | -1): boolean {
    const index = this.facade.logs().findIndex((log) => log.id === this.selected()?.id);
    return index >= 0 && !!this.facade.logs()[index + direction];
  }

  protected step(direction: 1 | -1): void {
    const logs = this.facade.logs();
    const next = logs[logs.findIndex((log) => log.id === this.selected()?.id) + direction];
    if (!next) return;
    this.selected.set(next);
    this.syncUrl();
  }

  protected payloadText(log: EventLog): string {
    return JSON.stringify(log.payload ?? {}, null, 2);
  }

  protected async copy(what: 'id' | 'payload', text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(what);
      setTimeout(() => this.copied.set(null), 1500);
    } catch {
      // Presse-papiers indisponible (contexte non sécurisé) : rien à faire.
    }
  }

  /** Échap ferme le détail, ↑ / ↓ passent au journal voisin (hors saisie). */
  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.selected() || (event.target as HTMLElement).closest('input, textarea, [contenteditable]')) return;
    if (event.key === 'Escape') this.close();
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.step(event.key === 'ArrowDown' ? 1 : -1);
    }
  }

  private syncUrl(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { log: this.selected()?.id ?? null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  /** « 02 nov. 23:59:58 » : date courte et heure à la seconde, en chiffres alignés. */
  protected formatTime(value: string): { day: string; time: string } {
    const date = new Date(value);
    return {
      day: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
      time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  }

  protected typeLabel(value: string): string {
    return this.entityTypes.find((type) => type.value === value)?.label ?? value;
  }

  private apply(): void {
    void this.facade.applyFilters({
      search: this.search().trim() || undefined,
      entityType: this.selectedType() || undefined,
    });
  }
}
