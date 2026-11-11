import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '../../../../../core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PaginatorModule, type PaginatorState } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import { SchoolFacade } from '../../../application/school.facade';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import { SchoolMemberRole, type MemberPage } from '../../../domain/models/school-membership.model';
import { InviteMemberDialog } from '../../components/invite-member-dialog/invite-member-dialog';

type RoleFilter = 'ALL' | SchoolMemberRole;

/** Onglet « Membres » d'une école : liste paginée des membres, puis invitation d'un nouveau membre. */
@Component({
  selector: 'app-school-members-page',
  imports: [
    DatePipe,
    FormsModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MessageModule,
    PaginatorModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    UserChip,
    InviteMemberDialog,
  ],
  templateUrl: './school-members-page.html',
})
export class SchoolMembersPage implements OnInit {
  private readonly facade = inject(SchoolFacade);
  private readonly membershipFacade = inject(SchoolMembershipFacade);
  readonly schoolId = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('schoolId') ?? '')), {
    initialValue: '',
  });
  readonly crumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/s/home', ariaLabel: 'Accueil' };
  readonly crumbs = computed<MenuItem[]>(() => [
    { label: 'Écoles', routerLink: '/s/schools' },
    { label: this.schoolName(), routerLink: ['/s/schools', this.schoolId()] },
    { label: 'Membres' },
  ]);
  readonly schoolName = () => this.facade.schools().find((s) => s.id === this.schoolId())?.name ?? 'École';

  readonly filters: { label: string; value: RoleFilter }[] = [
    { label: 'Tous', value: 'ALL' },
    { label: 'Administrateurs', value: SchoolMemberRole.ADMIN },
    { label: 'Membres', value: SchoolMemberRole.MEMBER },
  ];

  readonly inviteOpen = signal(false);
  readonly role = signal<RoleFilter>('ALL');
  readonly search = signal('');
  readonly page = signal(1);
  readonly limit = signal(20);
  readonly result = signal<MemberPage | null>(null);
  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);

  readonly members = computed(() => this.result()?.items ?? []);
  readonly total = computed(() => this.result()?.total ?? 0);
  /** La vue réduite (simple membre) ne renvoie ni statut ni date d'ajout. */
  readonly fullView = computed(() => this.members().some((member) => member.status !== null));

  private searchTimer: ReturnType<typeof setTimeout> | undefined;
  private requestId = 0;

  ngOnInit(): void {
    void this.load();
  }

  selectRole(value: RoleFilter | null): void {
    this.role.set(value ?? 'ALL');
    this.page.set(1);
    void this.load();
  }

  /** Recherche par nom ou e-mail, lancée 300 ms après la dernière frappe. */
  onSearch(value: string): void {
    this.search.set(value);
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.page.set(1);
      void this.load();
    }, 300);
  }

  changePage(event: PaginatorState): void {
    this.page.set((event.page ?? 0) + 1);
    if (event.rows) this.limit.set(event.rows);
    void this.load();
  }

  async load(): Promise<void> {
    const schoolId = this.schoolId();
    if (!schoolId) return;
    const request = ++this.requestId;
    this.isLoading.set(true);
    this.loadError.set(null);
    try {
      const role = this.role();
      const page = await this.membershipFacade.listMembers(schoolId, {
        role: role === 'ALL' ? undefined : role,
        search: this.search() || undefined,
        page: this.page(),
        limit: this.limit(),
      });
      // Une réponse plus ancienne (frappe rapide) ne doit pas écraser la dernière.
      if (request === this.requestId) this.result.set(page);
    } catch (error) {
      if (request === this.requestId) this.loadError.set(errorMessage(errorCodeOf(error)));
    } finally {
      if (request === this.requestId) this.isLoading.set(false);
    }
  }

  statusLabel(status: string | null): string {
    switch (status) {
      case 'ACTIVE':
        return 'Actif';
      case 'SUSPENDED':
        return 'Suspendu';
      case 'INACTIVE':
        return 'Inactif';
      case 'REVOKED':
        return 'Révoqué';
      default:
        return '—';
    }
  }

  statusSeverity(status: string | null): 'success' | 'warn' | 'secondary' | 'danger' {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'SUSPENDED':
        return 'warn';
      case 'REVOKED':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
