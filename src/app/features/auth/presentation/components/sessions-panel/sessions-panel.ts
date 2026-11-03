import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { Component, inject, input, signal, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { AuthFacade } from '../../../application/auth.facade';
import { LOGIN_PATH } from '../../../application/auth-navigation';
import type { ActiveSession } from '../../../domain/models/active-session.model';
import { deviceLabel } from './device-label';
import { errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';
import { NotifyService } from '../../../../../core/notifications/notify.service';

/** UC-21 / UC-22: the user's signed-in devices, with per-device and global sign-out. */
@Component({
  selector: 'app-sessions-panel',
  imports: [ButtonDirective, CardModule, MessageModule, TagModule],
  templateUrl: './sessions-panel.html',
})
export class SessionsPanel implements OnInit {
  /** Dans une section de paramètres : carte sans titre propre, alignée sur les autres, action en pied. */
  readonly embedded = input(false);
  readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);
  readonly sessions = signal<ActiveSession[]>([]);
  readonly isLoadingList = signal(true);
  readonly error = signal<string | null>(null);
  readonly deviceLabel = deviceLabel;

  /** « 3 nov. 2026 », en français (DatePipe utiliserait la locale anglaise par défaut). */
  formatDate(value: Date): string {
    return value.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /** « à l'instant », « il y a 5 min », « il y a 3 h », « il y a 2 j », puis la date. */
  timeAgo(value: Date): string {
    const minutes = Math.round((Date.now() - value.getTime()) / 60_000);
    if (minutes < 1) return 'à l’instant';
    if (minutes < 60) return `il y a ${minutes} min`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `il y a ${hours} h`;
    const days = Math.round(hours / 24);
    return days < 30 ? `il y a ${days} j` : `le ${this.formatDate(value)}`;
  }

  ngOnInit(): void {
    void this.load();
  }

  async load(): Promise<void> {
    this.isLoadingList.set(true);
    this.error.set(null);
    try {
      this.sessions.set(await this.auth.listSessions());
    } catch (error) {
      this.error.set(errorMessage(errorCodeOf(error)));
    } finally {
      this.isLoadingList.set(false);
    }
  }

  async revoke(session: ActiveSession): Promise<void> {
    if (!(await this.run(() => this.auth.revokeSession(session)))) return;
    if (session.current) await this.toLogin();
    else this.sessions.update((all) => all.filter(({ id }) => id !== session.id));
  }

  async logoutEverywhere(): Promise<void> {
    if (await this.run(() => this.auth.logoutEverywhere())) await this.toLogin();
  }

  private async run(action: () => Promise<void>): Promise<boolean> {
    try {
      await action();
      return true;
    } catch (error) {
      this.notify.fromError(error, 'Déconnexion impossible');
      return false;
    }
  }

  private async toLogin(): Promise<void> {
    await this.router.navigateByUrl(LOGIN_PATH, { replaceUrl: true });
  }
}
