import { Component, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SelectModule, type SelectFilterEvent } from 'primeng/select';
import { UserChip } from '../../../../../shared/components/user-chip/user-chip';
import type { UserSummary } from '../../../../../shared/users/user-summary';
import { SchoolMembershipFacade } from '../../../application/school-membership.facade';

/** Choisit, parmi les membres actifs de l'école, celui qui deviendra administrateur. */
@Component({
  selector: 'app-replace-admin-form',
  imports: [FormsModule, ButtonModule, MessageModule, SelectModule, UserChip],
  templateUrl: './replace-admin-form.html',
})
export class ReplaceAdminForm implements OnInit {
  readonly schoolId = input.required<string>();
  /** Les administrateurs actuels ne sont pas proposés. */
  readonly excludedUserIds = input<string[]>([]);
  readonly isLoading = input(false);
  readonly submitReplace = output<string>();
  readonly cancel = output<void>();

  private readonly memberships = inject(SchoolMembershipFacade);

  readonly candidates = signal<UserSummary[]>([]);
  readonly isSearching = signal(false);
  readonly selectedId = signal<string | null>(null);
  readonly touched = signal(false);
  readonly options = computed(() => this.candidates().filter((user) => !this.excludedUserIds().includes(user.id)));

  private searchTimer: ReturnType<typeof setTimeout> | undefined;
  private requestId = 0;

  ngOnInit(): void {
    void this.search('');
  }

  /** La recherche interroge l'API (nom ou e-mail) : l'école peut compter des centaines de membres. */
  onFilter(event: SelectFilterEvent): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => void this.search(event.filter ?? ''), 300);
  }

  private async search(term: string): Promise<void> {
    const request = ++this.requestId;
    this.isSearching.set(true);
    try {
      const page = await this.memberships.listMembers(this.schoolId(), {
        role: undefined,
        search: term.trim() || undefined,
        page: 1,
        limit: 50,
      });
      if (request !== this.requestId) return;
      // Seul un membre actif peut recevoir l'administration de l'école.
      const active = page.items.filter((member) => member.status === null || member.status === 'ACTIVE');
      const selected = this.candidates().find((user) => user.id === this.selectedId());
      const users = active.map((member) => member.user);
      this.candidates.set(selected && !users.some((user) => user.id === selected.id) ? [selected, ...users] : users);
    } catch {
      if (request === this.requestId) this.candidates.set([]);
    } finally {
      if (request === this.requestId) this.isSearching.set(false);
    }
  }

  onSubmit(): void {
    if (this.isLoading()) return;
    this.touched.set(true);
    const id = this.selectedId();
    if (id) this.submitReplace.emit(id);
  }
}
