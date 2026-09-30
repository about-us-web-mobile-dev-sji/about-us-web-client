import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

type Severity = 'error' | 'warn' | 'success';

const DEFAULT_LIFE_MS = 6000;
const DUPLICATE_WINDOW_MS = 3000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messageService = inject(MessageService);
  private readonly recent = new Map<string, number>();

  error(summary: string, detail?: string): void {
    this.show('error', summary, detail);
  }

  warn(summary: string, detail?: string): void {
    this.show('warn', summary, detail);
  }

  success(summary: string, detail?: string): void {
    this.show('success', summary, detail);
  }

  private show(severity: Severity, summary: string, detail?: string): void {
    const now = Date.now();
    this.prune(now);

    const key = `${severity}|${summary}|${detail ?? ''}`;
    const lastShownAt = this.recent.get(key);
    if (lastShownAt !== undefined && now - lastShownAt < DUPLICATE_WINDOW_MS) return;

    this.recent.set(key, now);
    this.messageService.add({ severity, summary, detail, life: DEFAULT_LIFE_MS });
  }

  private prune(now: number): void {
    for (const [key, shownAt] of this.recent) {
      if (now - shownAt >= DUPLICATE_WINDOW_MS) this.recent.delete(key);
    }
  }
}
