import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { errorCodeOf } from '../errors/app-error';
import { errorMessage } from '../i18n/error-messages';

export type NotifySeverity = 'success' | 'info' | 'warn' | 'error';

/** Durée d'affichage par gravité : une erreur laisse le temps de lire et d'agir. */
const LIFE: Readonly<Record<NotifySeverity, number>> = {
  success: 4000,
  info: 5000,
  warn: 6000,
  error: 7000,
};

/**
 * Point d'entrée unique des notifications (popups en haut à droite, rendus par le
 * <p-toast> global de App). Les pages n'utilisent jamais MessageService directement.
 */
@Injectable({ providedIn: 'root' })
export class NotifyService {
  /** Fourni par app.config ; facultatif pour que les tests unitaires n'aient pas à le déclarer. */
  private readonly messages = inject(MessageService, { optional: true });

  success(summary: string, detail?: string): void {
    this.show('success', summary, detail);
  }

  info(summary: string, detail?: string): void {
    this.show('info', summary, detail);
  }

  warn(summary: string, detail?: string): void {
    this.show('warn', summary, detail);
  }

  error(summary: string, detail?: string): void {
    this.show('error', summary, detail);
  }

  /**
   * Erreur venant d'un appel : le détail est le message traduit du code backend
   * (`{ code, message }`), éventuellement précisé pour l'écran via `overrides`.
   */
  fromError(error: unknown, summary = 'Action impossible', overrides: Readonly<Record<string, string>> = {}): void {
    this.show('error', summary, errorMessage(errorCodeOf(error), overrides));
  }

  private show(severity: NotifySeverity, summary: string, detail?: string): void {
    this.messages?.add({ key: 'app', severity, summary, detail, life: LIFE[severity] });
  }
}
