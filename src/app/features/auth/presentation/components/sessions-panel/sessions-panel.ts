import { Component, inject, signal, type OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { AuthFacade } from '../../../application/auth.facade';
import { LOGIN_PATH } from '../../../application/auth-navigation';
import type { ActiveSession } from '../../../domain/models/active-session.model';
import { deviceLabel } from './device-label';
import { errorCodeOf } from '../../../../../core/errors/app-error';
import { errorMessage } from '../../../../../core/i18n/error-messages';

/** UC-21 / UC-22: the user's signed-in devices, with per-device and global sign-out. */
@Component({
  selector: 'app-sessions-panel',
  imports: [ButtonDirective, DatePipe],
  templateUrl: './sessions-panel.html',
  styleUrl: './sessions-panel.css',
})
export class SessionsPanel implements OnInit {
  readonly auth = inject(AuthFacade);
  private readonly router = inject(Router);
  readonly sessions = signal<ActiveSession[]>([]);
  readonly isLoadingList = signal(true);
  readonly error = signal<string | null>(null);
  readonly deviceLabel = deviceLabel;

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
    this.error.set(null);
    try {
      await action();
      return true;
    } catch (error) {
      this.error.set(errorMessage(errorCodeOf(error)));
      return false;
    }
  }

  private async toLogin(): Promise<void> {
    await this.router.navigateByUrl(LOGIN_PATH, { replaceUrl: true });
  }
}
