import { Component, effect, inject, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SelectModule, type SelectFilterEvent } from 'primeng/select';
import { NotifyService } from '../../../../../core/notifications/notify.service';
import { AppModal } from '../../../../../shared/components/modal/modal';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import type { UserSummary } from '../../../../../shared/users/user-summary';
import { SchoolMembershipFacade } from '../../../../school/application/school-membership.facade';
import { SpaceFacade } from '../../../application/space.facade';

/** Ajoute à un espace un membre actif de l'école (recherche par nom ou e-mail côté serveur). */
@Component({
  selector: 'app-add-space-member-dialog',
  imports: [FormsModule, ButtonModule, MessageModule, SelectModule, AppModal, UserChip],
  templateUrl: './add-space-member-dialog.html',
})
export class AddSpaceMemberDialog {
  readonly visible = model(false);
  readonly schoolId = input.required<string>();
  readonly spaceId = input.required<string>();
  /** Déjà membres de l'espace : non proposés. */
  readonly excludedUserIds = input<string[]>([]);
  readonly added = output<void>();

  private readonly schoolMembers = inject(SchoolMembershipFacade);
  private readonly spaces = inject(SpaceFacade);
  private readonly notify = inject(NotifyService);

  readonly candidates = signal<UserSummary[]>([]);
  readonly isSearching = signal(false);
  readonly isSaving = signal(false);
  readonly selectedId = signal<string | null>(null);
  readonly touched = signal(false);

  private searchTimer: ReturnType<typeof setTimeout> | undefined;
  private requestId = 0;

  private readonly resetOnOpen = effect(() => {
    if (!this.visible()) return;
    this.selectedId.set(null);
    this.touched.set(false);
    void this.search('');
  });

  onFilter(event: SelectFilterEvent): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => void this.search(event.filter ?? ''), 300);
  }

  private async search(term: string): Promise<void> {
    const request = ++this.requestId;
    this.isSearching.set(true);
    try {
      const page = await this.schoolMembers.listMembers(this.schoolId(), {
        search: term.trim() || undefined,
        page: 1,
        limit: 50,
      });
      if (request !== this.requestId) return;
      const excluded = new Set(this.excludedUserIds());
      this.candidates.set(
        page.items
          .filter((member) => (member.status === null || member.status === 'ACTIVE') && !excluded.has(member.user.id))
          .map((member) => member.user),
      );
    } catch {
      if (request === this.requestId) this.candidates.set([]);
    } finally {
      if (request === this.requestId) this.isSearching.set(false);
    }
  }

  async submit(): Promise<void> {
    if (this.isSaving()) return;
    this.touched.set(true);
    const userId = this.selectedId();
    if (!userId) return;
    this.isSaving.set(true);
    try {
      await this.spaces.addMember(this.spaceId(), userId);
      const user = this.candidates().find((candidate) => candidate.id === userId);
      this.notify.success('Membre ajouté', `${user?.fullName || user?.email || 'Le membre'} fait maintenant partie de l'espace.`);
      this.added.emit();
      this.visible.set(false);
    } catch (error) {
      this.notify.fromError(error, 'Ajout impossible');
    } finally {
      this.isSaving.set(false);
    }
  }
}
