import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '../../rxjs-interop';
import { filter } from 'rxjs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { Sidebar } from '@primeicons/angular/sidebar';
import { PIcon } from '@primeicons/angular/p-icon';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService, type ThemeMode } from '../../theme/theme.service';
import { AuthFacade } from '../../../features/auth';
import { LOGIN_PATH } from '../../../features/auth/application/auth-navigation';
import { NotifyService } from '../../notifications/notify.service';

@Component({
  selector: 'app-admin-layout',
  imports: [
    SidebarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AvatarModule,
    Sidebar,
    PIcon,
    MenuModule,
    FormsModule,
    SelectButtonModule,
  ],
  templateUrl: './admin-layout.html',
  host: { class: 'au-layout' },
})
export class AdminLayout {
  readonly auth = inject(AuthFacade);
  readonly navGroups = [
    {
      label: 'Navigation',
      items: [
        { icon: 'home', label: 'Accueil', route: '/s/home' },
        { icon: 'users', label: 'Utilisateurs', route: '/s/users' },
        { icon: 'building', label: 'Écoles', route: '/s/schools' },
        // Ouvre un espace à part (sa propre barre latérale) : signalé par un chevron en fin de ligne.
        { icon: 'list', label: 'Logs', route: '/s/events', opensSpace: true },
      ],
    },
  ];
  readonly initials = computed(
    () =>
      this.auth
        .userName()
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase() || 'A',
  );
  readonly sidebarOpen = signal(true);

  // ---------- Menu du profil (barre du haut) ----------
  private readonly router = inject(Router);
  private readonly notify = inject(NotifyService);
  readonly profileMenuOpen = signal(false);
  readonly profileItems: MenuItem[] = [
    { label: 'Profil', icon: 'pi pi-user', routerLink: '/s/account/profile' },
    { label: 'Sécurité', icon: 'pi pi-shield', routerLink: '/s/account/security' },
  ];
  readonly theme = inject(ThemeService);
  readonly themeOptions: { label: string; value: ThemeMode }[] = [
    { label: 'Clair', value: 'light' },
    { label: 'Sombre', value: 'dark' },
    { label: 'Système', value: 'system' },
  ];

  async logout(): Promise<void> {
    try {
      await this.auth.logout();
    } catch (error) {
      this.notify.fromError(error, 'Déconnexion impossible');
      return;
    }
    await this.router.navigateByUrl(LOGIN_PATH, { replaceUrl: true });
  }

  /**
   * Espace d'une école, journaux d'événements et paramètres du compte : leur propre barre latérale (avec un bouton retour)
   * remplace la navigation principale, et le contenu occupe toute la largeur.
   */
  readonly flushContent = signal(false);

  constructor() {
    const router = inject(Router);
    this.syncWithUrl(router.url);
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((event) => this.syncWithUrl(event.urlAfterRedirects));
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  /** La navigation principale garde l'état choisi par l'utilisateur ; seul le contenu passe en pleine largeur. */
  private syncWithUrl(url: string): void {
    this.flushContent.set(
      /^\/s\/schools\/[^/?#]+/.test(url) ||
        /^\/s\/events(\/aggregate\/[^?#]*)?([?#].*)?$/.test(url) ||
        /^\/s\/account(\/|$|[?#])/.test(url),
    );
  }
}
