import { NotifyService } from '../../../../../core/notifications/notify.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Menu, MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { PaginatorModule, type PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';
import { InviteMemberDialog } from '../../components/invite-member-dialog/invite-member-dialog';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import { SchoolFacade } from '../../../application/school.facade';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';
import {
  InvitationStatus,
  canCancelInvitation,
  canResendInvitation,
  type InvitationPage,
  type SchoolInvitation,
} from '../../../domain/models/school-membership.model';

type StatusFilter = 'ALL' | InvitationStatus;

/** Messages propres à cet écran (l'objet de l'erreur dépend de l'action en cours). */
const ERROR_OVERRIDES: Readonly<Record<string, string>> = {
  SCHOOL_INVITATION_INVALID: 'Cette invitation ne peut plus être modifiée : elle a déjà été acceptée ou annulée.',
  INVALID_SCHOOL_MEMBERSHIP: 'Cette personne est déjà membre de l’école ou a été suspendue.',
  SCHOOL_MEMBERSHIP_ACTION_FORBIDDEN:
    'Action refusée : vous n’administrez pas cette école, ou cette personne a été révoquée.',
  INVALID_SCHOOL: 'L’école est bloquée : débloquez-la dans ses paramètres pour renvoyer des invitations.',
  BAD_REQUEST: 'La recherche ou le filtre est invalide.',
};

/** Onglet « Invitations » d'une école : suivi, renvoi et annulation des invitations envoyées. */
@Component({
  selector: 'app-school-invitations-page',
  imports: [
    DatePipe,
    FormsModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MenuModule,
    MessageModule,
    PaginatorModule,
    TableModule,
    SelectButtonModule,
    TagModule,
    UserChip,
    InviteMemberDialog,
  ],
  providers: [ConfirmationService],
  templateUrl: './school-invitations-page.html',
})
export class SchoolInvitationsPage implements OnInit {
  private readonly membershipFacade = inject(SchoolMembershipFacade);
  private readonly schoolFacade = inject(SchoolFacade);
  private readonly notify = inject(NotifyService);
  private readonly confirmation = inject(ConfirmationService);

  readonly schoolId = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('schoolId') ?? '')), {
    initialValue: '',
  });
  readonly menu = viewChild.required<Menu>('menu');
  menuItems: MenuItem[] = [];

  readonly filters: { label: string; value: StatusFilter }[] = [
    { label: 'Toutes', value: 'ALL' },
    { label: 'En attente', value: InvitationStatus.PENDING },
    { label: 'Expirées', value: InvitationStatus.EXPIRED },
    { label: 'Acceptées', value: InvitationStatus.ACCEPTED },
    { label: 'Annulées', value: InvitationStatus.CANCELLED },
  ];

  readonly inviteOpen = signal(false);
  readonly status = signal<StatusFilter>('ALL');
  readonly search = signal('');
  readonly page = signal(1);
  readonly limit = signal(20);
  readonly result = signal<InvitationPage | null>(null);
  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);
  /** Invitation sur laquelle une action est en cours (bloque son menu). */
  readonly busyId = signal<string | null>(null);

  readonly invitations = computed(() => this.result()?.items ?? []);
  readonly total = computed(() => this.result()?.total ?? 0);

  readonly crumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/s/home', ariaLabel: 'Accueil' };
  readonly crumbs = computed<MenuItem[]>(() => [
    { label: 'Écoles', routerLink: '/s/schools' },
    { label: this.schoolName(), routerLink: ['/s/schools', this.schoolId()] },
    { label: 'Invitations' },
  ]);

  private searchTimer: ReturnType<typeof setTimeout> | undefined;
  private requestId = 0;

  ngOnInit(): void {
    void this.load();
  }

  schoolName(): string {
    return this.schoolFacade.schools().find((s) => s.id === this.schoolId())?.name ?? 'École';
  }

  selectStatus(value: StatusFilter | null): void {
    this.status.set((value as StatusFilter) ?? 'ALL');
    this.page.set(1);
    void this.load();
  }

  /** Recherche par e-mail, lancée 300 ms après la dernière frappe. */
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
      const status = this.status();
      const page = await this.membershipFacade.listInvitations(schoolId, {
        status: status === 'ALL' ? undefined : status,
        search: this.search() || undefined,
        page: this.page(),
        limit: this.limit(),
      });
      // Une réponse plus ancienne (frappe rapide, changement d'onglet) ne doit pas écraser la dernière.
      if (request === this.requestId) this.result.set(page);
    } catch (error) {
      if (request === this.requestId) this.loadError.set(errorMessage(errorCodeOf(error), ERROR_OVERRIDES));
    } finally {
      if (request === this.requestId) this.isLoading.set(false);
    }
  }

  openActions(event: Event, invitation: SchoolInvitation): void {
    const busy = this.busyId() === invitation.id;
    this.menuItems = [
      ...(canResendInvitation(invitation.status)
        ? [{ label: 'Renvoyer', icon: 'pi pi-send', disabled: busy, command: () => void this.resend(invitation) }]
        : []),
      ...(canCancelInvitation(invitation.status)
        ? [
            { separator: true },
            {
              label: 'Annuler l’invitation',
              icon: 'pi pi-times',
              styleClass: 'au-menu-danger',
              disabled: busy,
              command: () => this.confirmCancel(invitation),
            },
          ]
        : []),
    ];
    this.menu().toggle(event);
  }

  hasActions(invitation: SchoolInvitation): boolean {
    return canResendInvitation(invitation.status) || canCancelInvitation(invitation.status);
  }

  /** Le serveur crée une nouvelle invitation et annule l'ancienne : on recharge la liste. */
  private async resend(invitation: SchoolInvitation): Promise<void> {
    this.busyId.set(invitation.id);
    try {
      const fresh = await this.membershipFacade.resendInvitation(this.schoolId(), invitation.id);
      this.notify.success('Invitation renvoyée', `Un nouveau lien a été envoyé à ${fresh.email}. Il est valable 7 jours.`);
      await this.load();
    } catch (error) {
      this.showError(error);
    } finally {
      this.busyId.set(null);
    }
  }

  private confirmCancel(invitation: SchoolInvitation): void {
    this.confirmation.confirm({
      header: 'Annuler l’invitation ?',
      message: `Le lien envoyé à ${invitation.email} ne fonctionnera plus. Vous pourrez la renvoyer plus tard.`,
      icon: 'pi pi-times-circle',
      acceptLabel: 'Annuler l’invitation',
      rejectLabel: 'Garder',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => void this.cancel(invitation),
    });
  }

  private async cancel(invitation: SchoolInvitation): Promise<void> {
    this.busyId.set(invitation.id);
    try {
      await this.membershipFacade.cancelInvitation(this.schoolId(), invitation.id);
      this.notify.success('Invitation annulée', `Le lien envoyé à ${invitation.email} ne fonctionne plus.`);
      await this.load();
    } catch (error) {
      this.showError(error);
    } finally {
      this.busyId.set(null);
    }
  }

  private showError(error: unknown): void {
    this.notify.error('Action impossible', errorMessage(errorCodeOf(error), ERROR_OVERRIDES));
  }

  statusLabel(status: InvitationStatus): string {
    switch (status) {
      case InvitationStatus.PENDING:
        return 'En attente';
      case InvitationStatus.EXPIRED:
        return 'Expirée';
      case InvitationStatus.ACCEPTED:
        return 'Acceptée';
      case InvitationStatus.CANCELLED:
        return 'Annulée';
    }
  }

  statusSeverity(status: InvitationStatus): 'info' | 'warn' | 'success' | 'secondary' {
    switch (status) {
      case InvitationStatus.PENDING:
        return 'info';
      case InvitationStatus.EXPIRED:
        return 'warn';
      case InvitationStatus.ACCEPTED:
        return 'success';
      case InvitationStatus.CANCELLED:
        return 'secondary';
    }
  }
}
