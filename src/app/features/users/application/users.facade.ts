import { Injectable, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ListUsersUseCase } from './use-cases/list-users.use-case';
import { UpdateUserStatusUseCase } from './use-cases/update-user-status.use-case';
import { ListUsersResult, User, UserStatus } from '../domain/models/user.model';
import { ListUsersQuery } from '../domain/ports/user.repository';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly listUsersUseCase = inject(ListUsersUseCase);
  private readonly updateUserStatusUseCase = inject(UpdateUserStatusUseCase);

  readonly users = signal<User[]>([]);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly limit = signal(10);
  readonly totalPages = signal(1);
  readonly filters = signal<Pick<ListUsersQuery, 'status' | 'search'>>({});
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  async loadUsers(page = this.page(), limit = this.limit(), filters = this.filters()) {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const result = await this.listUsersUseCase.execute({ page, limit, ...filters });
      this.setResult(result);
    } catch (error) {
      this.error.set(this.getRequestError(error, 'charger les utilisateurs'));
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateStatus(userId: string, status: UserStatus) {
    this.error.set(null);
    try {
      const updatedUser = await this.updateUserStatusUseCase.execute({ userId, status });
      this.users.update((users) => users.map((user) => user.id === updatedUser.id ? updatedUser : user));
    } catch (error) {
      this.error.set(this.getRequestError(error, 'modifier le statut'));
    }
  }

  async applyFilters(filters: Pick<ListUsersQuery, 'status' | 'search'>) {
    this.filters.set(filters);
    await this.loadUsers(1, this.limit(), filters);
  }

  private setResult(result: ListUsersResult) {
    this.users.set(result.items);
    this.total.set(result.total);
    this.page.set(result.page);
    this.limit.set(result.limit);
    this.totalPages.set(result.totalPages);
  }

  private getRequestError(error: unknown, action: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return `Impossible de ${action} : API inaccessible ou CORS (${error.url ?? 'URL inconnue'}).`;
      }
      return `Impossible de ${action} : HTTP ${error.status}.`;
    }
    return `Impossible de ${action}.`;
  }
}