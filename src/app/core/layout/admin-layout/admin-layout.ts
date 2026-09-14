import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonDirective } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Sidebar } from '@primeicons/angular/sidebar';
import { PIcon } from '@primeicons/angular/p-icon';
import { AuthFacade } from '../../../features/auth/application/auth.facade';

@Component({
  selector: 'app-admin-layout',
  imports: [
    SidebarModule,
    ButtonDirective,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AvatarModule,
    Sidebar,
    PIcon,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  readonly auth = inject(AuthFacade);
  readonly navGroups = [
    { label: 'Navigation', 
      items: [
        { icon: 'home', label: 'Accueil', route: '/s/home' },
        { icon: 'users', label: 'Utilisateurs', route: '/s/users' },
        { icon: 'users', label: 'Ecoles', route: '/s/schools/create' },
        { icon: 'history', label: 'Évènements', route: '/s/events' },

        
      ] },
    {
      label: 'Administration',
      items: [{ icon: 'cog', label: 'Paramètres', route: '/s/settings' }],
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
}
