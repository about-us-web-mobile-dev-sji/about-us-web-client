import { Component, OnInit, inject, viewChild } from '@angular/core';
import { UsersFacade } from '../../../application/users.facade';
import { User, UserStatus } from '../../../domain/models/user.model';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    PaginatorModule,
    MenuModule,
    CardModule,
    AvatarModule,
    TagModule,
    MessageModule,
    IconFieldModule,
    InputIconModule,

  ]
})
export class UsersPage implements OnInit {
  readonly facade = inject(UsersFacade);
  readonly menu = viewChild.required<Menu>('menu');

  menuItems: MenuItem[] = [];

  isUpdating(userId: string): boolean {
    return this.facade.isUpdating(userId);
  }

  private buildMenuItems(user: User): MenuItem[] {
    const updating = this.facade.isUpdating(user.id);
    return [
      {
        label: 'Activer',
        icon: 'pi pi-check',
        disabled: user.status === UserStatus.ACTIVE || updating,
        command: () => {
          void this.facade.activate(user);
        },
      },
      {
        label: 'Suspendre',
        icon: 'pi pi-ban',
        disabled: user.status === UserStatus.SUSPENDED || updating,
        command: () => {
          void this.facade.suspend(user);
        },
      },
      {
        separator: true,
      },
      {
        label: 'Voir les détails',
        icon: 'pi pi-eye',
        command: () => {
          this.viewUser(user);
        },
      },
    ];
  }

  private viewUser(user: User): void {
    console.log(user);
  }

  openMenu(event: Event, user: User): void {
    this.menuItems = this.buildMenuItems(user);
    this.menu().toggle(event);
  }


  readonly statusFilters: { label: string; value: UserStatus | null }[] = [
    { label: 'Tous', value: null },
    { label: 'Actifs', value: UserStatus.ACTIVE },
    { label: 'Suspendus', value: UserStatus.SUSPENDED },
  ];
  statusFilter: UserStatus | null = null;

  initials(user: User): string {
    const letters = [user.firstName, user.lastName]
      .map((part) => part?.trim().charAt(0) ?? '')
      .join('');
    return (letters || user.email.charAt(0)).toUpperCase();
  }

  statusLabel(status: UserStatus): string {
    return status === UserStatus.ACTIVE ? 'Actif' : 'Suspendu';
  }

  statusSeverity(status: UserStatus): 'success' | 'danger' {
    return status === UserStatus.ACTIVE ? 'success' : 'danger';
  }

  ngOnInit(): void {
    void this.facade.users.load();
  }

  search(value: string): void {
    void this.facade.users.patchFilters({search: value || undefined});
  }

  filterStatus(status: UserStatus | undefined): void {
    void this.facade.users.patchFilters({status});
  }

  filterSchool(schoolId: string | undefined): void {
    void this.facade.users.patchFilters({schoolId});
  }

  changePage(event: {page?: number;rows?: number;}): void {
    const page =(event.page ?? 0) + 1;
    const pageSize =event.rows ?? this.facade.users.pageSize();
    if (pageSize !==this.facade.users.pageSize()) {
      void this.facade.users.setPageSize(pageSize);
      return;
    }
    void this.facade.users.setPage(page);
  }

}

