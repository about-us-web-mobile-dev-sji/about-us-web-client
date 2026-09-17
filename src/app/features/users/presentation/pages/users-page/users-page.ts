import { Component, OnInit, inject, viewChild } from '@angular/core';
import { UsersFacade } from '../../../application/users.facade';
import { User, UserStatus } from '../../../domain/models/user.model';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
  standalone: true,
  imports: [
    TableModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    PaginatorModule,
    MenuModule

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


  readonly statusOptions = [
    {
      label: 'Actif',
      value: UserStatus.ACTIVE
    },
    {
      label: 'Suspendu',
      value: UserStatus.SUSPENDED
    }
  ];

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

