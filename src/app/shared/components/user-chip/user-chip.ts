import { Component, computed, input, signal } from '@angular/core';
import { userInitials, userLabel, type UserSummary } from '../../users/user-summary';

/** Photo de profil (ou initiales), nom et, si demandé, e-mail d'un utilisateur. */
@Component({
  selector: 'app-user-chip',
  template: `
    @if (user(); as current) {
      <span class="inline-flex min-w-0 items-center gap-2.5 align-middle" [title]="current.email ?? label()">
        @if (current.avatarUrl && !imageFailed()) {
          <img
            [src]="current.avatarUrl"
            alt=""
            [class]="avatarClass()"
            class="flex-none rounded-full object-cover"
            loading="lazy"
            (error)="imageFailed.set(true)"
          />
        } @else {
          <span
            [class]="avatarClass()"
            class="grid flex-none place-items-center rounded-full bg-(--au-panel) font-semibold text-color"
            aria-hidden="true"
          >{{ initials() }}</span>
        }
        @if (!avatarOnly()) {
        <span class="min-w-0 leading-tight">
          <span class="block truncate font-medium text-color">{{ label() }}</span>
          @if (showEmail() && current.email && current.fullName) {
            <span class="block truncate text-xs text-muted-color">{{ current.email }}</span>
          }
        </span>
        }
      </span>
    } @else {
      <span class="text-muted-color">—</span>
    }
  `,
})
export class UserChip {
  readonly user = input<UserSummary | null | undefined>(null);
  readonly showEmail = input(false);
  readonly size = input<'sm' | 'md'>('md');
  /** Photo seule (le nom est affiché ailleurs) ; le nom reste dans l'infobulle. */
  readonly avatarOnly = input(false);

  readonly imageFailed = signal(false);
  readonly label = computed(() => userLabel(this.user()));
  readonly initials = computed(() => (this.user() ? userInitials(this.user()!) : ''));
  readonly avatarClass = computed(() => (this.size() === 'sm' ? 'size-7 text-xs' : 'size-9 text-sm'));
}
