import { Component, OnInit, inject } from '@angular/core';
import { UsersFacade } from '../../../application/users.facade';
import { UserStatus } from '../../../domain/models/user.model';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
  standalone: true,
})
export class UsersPage implements OnInit {
  protected readonly usersFacade = inject(UsersFacade);
  protected readonly statusOptions = Object.values(UserStatus);
  protected readonly activeStatus = UserStatus.ACTIVE;
  protected readonly suspendedStatus = UserStatus.SUSPENDED;

  ngOnInit() {
    void this.usersFacade.loadUsers();
  }

  protected changePage(page: number) {
    if (page < 1 || page > this.usersFacade.totalPages()) {
      return;
    }
    void this.usersFacade.loadUsers(page);
  }

  protected updateStatus(userId: string | undefined, status: UserStatus) {
    if (userId) {
      void this.usersFacade.updateStatus(userId, status);
    }
  }

  protected applyFilters(search: string, status: string) {
    void this.usersFacade.applyFilters({
      search: search.trim() || undefined,
      status: status ? status as UserStatus : undefined,
    });
  }
}