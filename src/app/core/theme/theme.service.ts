import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'au-theme';
const DARK_CLASS = 'au-dark';

/**
 * Thème clair, sombre ou celui du système. Le choix est gardé dans le navigateur ;
 * le mode sombre pose la classe `au-dark` sur <html>, qui inverse la gamme de gris du thème.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly media =
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  private readonly systemDark = signal(this.media?.matches ?? false);

  readonly mode = signal<ThemeMode>(this.readStoredMode());
  readonly isDark = computed(() => this.mode() === 'dark' || (this.mode() === 'system' && this.systemDark()));

  private readonly apply = effect(() => {
    document.documentElement.classList.toggle(DARK_CLASS, this.isDark());
  });

  constructor() {
    const onChange = (event: MediaQueryListEvent) => this.systemDark.set(event.matches);
    this.media?.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => this.media?.removeEventListener('change', onChange));
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour cette visite.
    }
  }

  private readStoredMode(): ThemeMode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'light';
    } catch {
      return 'light';
    }
  }
}
