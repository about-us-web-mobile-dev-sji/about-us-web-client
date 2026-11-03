import { Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, type MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Menu, MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { PaginatorModule, type PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { NotifyService } from '../../../../../core/notifications/notify.service';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import { userLabel } from '../../../../../shared/users/user-summary';
import { SpaceFacade } from '../../../application/space.facade';
import { SpaceMembershipRole, type SpaceMembersPage as MembersResult, type SpaceMembership } from '../../../domain/models/space.model';
import { AddSpaceMemberDialog } from '../../components/add-space-member-dialog/add-space-member-dialog';

/** Onglet « Membres » d'un espace : liste paginée, ajout depuis les membres de l'école, retrait. */
@Component({
  selector: 'app-space-members-page',
  imports: [ButtonModule, CardModule, ConfirmDialogModule, MenuModule, MessageModule, PaginatorModule, TableModule, TagModule, UserChip, AddSpaceMemberDialog],
  providers: [ConfirmationService],
  templateUrl: './space-members-page.html',
})
export class SpaceMembersPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly facade = inject(SpaceFacade);
  private readonly notify = inject(NotifyService);
  private readonly confirmation = inject(ConfirmationService);
  readonly menu = viewChild.required<Menu>('menu');

  readonly schoolId = this.route.snapshot.paramMap.get('schoolId') ?? '';
  readonly spaceId = this.route.snapshot.paramMap.get('spaceId') ?? '';
  readonly page = signal(1);
  readonly limit = signal(20);
  readonly result = signal<MembersResult | null>(null);
  readonly isLoading = signal(false);
  readonly loadError = signal(false);
  readonly addOpen = signal(false);
  readonly busyId = signal<string | null>(null);
  menuItems: MenuItem[] = [];

  readonly members = computed(() => this.result()?.items ?? []);
  readonly total = computed(() => this.result()?.total ?? 0);
  readonly memberIds = computed(() => this.members().map((member) => member.userId));

  ngOnInit(): void {
    void this.load();
  }

  async load(): Promise<void> {
    this.isLoading.set(true);
    this.loadError.set(false);
    try {
      this.result.set(await this.facade.listMembers(this.spaceId, this.page(), this.limit()));
    } catch {
      this.loadError.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  changePage(event: PaginatorState): void {
    this.page.set((event.page ?? 0) + 1);
    if (event.rows) this.limit.set(event.rows);
    void this.load();
  }

  openActions(event: Event, member: SpaceMembership): void {
    this.menuItems = [
      {
        label: 'Retirer de l’espace',
        icon: 'pi pi-user-minus',
        styleClass: 'au-menu-danger',
        disabled: this.busyId() === member.userId,
        command: () => this.confirmRemove(member),
      },
    ];
    this.menu().toggle(event);
  }

  private confirmRemove(member: SpaceMembership): void {
    this.confirmation.confirm({
      header: 'Retirer ce membre ?',
      message: `${userLabel(member.user)} n'aura plus accès à cet espace. Il reste membre de l'école.`,
      icon: 'pi pi-user-minus',
      acceptLabel: 'Retirer',
      rejectLabel: 'Annuler',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => void this.remove(member),
    });
  }

  private async remove(member: SpaceMembership): Promise<void> {
    this.busyId.set(member.userId);
    try {
      await this.facade.removeMember(this.spaceId, member.userId);
      this.notify.success('Membre retiré', `${userLabel(member.user)} ne fait plus partie de l'espace.`);
      await this.load();
    } catch (error) {
      this.notify.fromError(error, 'Retrait impossible');
    } finally {
      this.busyId.set(null);
    }
  }

  isManager(member: SpaceMembership): boolean {
    return member.role === SpaceMembershipRole.MANAGER;
  }

  formatDate(value: Date | null): string {
    return value ? value.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  }
}
