import { Component, OnInit, inject, signal } from '@angular/core';
import { UsersFacade } from '../../../application/users.facade';
import { UserStatus } from '../../../domain/models/user.model';
import { School } from '../../../domain/models/school.model';
import { HttpSchoolRepository } from '../../../infrastructure/repositories/http-school.repository';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  styleUrl: './users-page.css',
  standalone: true,
})
export class UsersPage implements OnInit {
  protected readonly usersFacade = inject(UsersFacade);
  private readonly schoolRepository = inject(HttpSchoolRepository);
  protected readonly schools = signal<School[]>([]);
  protected readonly statusOptions = Object.values(UserStatus);
  protected readonly activeStatus = UserStatus.ACTIVE;
  protected readonly suspendedStatus = UserStatus.SUSPENDED;

  ngOnInit() {
    void this.usersFacade.loadUsers();
    void this.loadSchools();
  }

  private async loadSchools() {
    try {
      this.schools.set(await this.schoolRepository.list());
    } catch {
      this.schools.set([]);
    }
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

  protected applyFilters(search: string, status: string, schoolId: string) {
    void this.usersFacade.applyFilters({
      search: search.trim() || undefined,
      status: status ? status as UserStatus : undefined,
      schoolId: schoolId.trim() || undefined,
    });
  }
}