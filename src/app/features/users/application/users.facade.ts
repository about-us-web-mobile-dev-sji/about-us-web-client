import { computed, inject, Injectable, signal } from '@angular/core';
import { UsersService } from './users.service';
import { User, UserStatus } from '../domain/models/user.model';
import { DataSource } from '../../../shared/data/data-source';
import type { Page } from '../../../shared/data/page';
import type { DataQuery } from '../../../shared/data/data-query';

export interface UserFilters {
  search?: string;
  status?: UserStatus;
  schoolId?: string;
}


@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly usersService = inject(UsersService);

  readonly users = new DataSource<User, UserFilters>(
    (query) => this.fetchUsers(query),
    { initialFilters: {}, initialPageSize: 10 },
  );

  private readonly updatingIds = signal<Set<string>>(new Set());
  readonly updatingIdsSnapshot = this.updatingIds.asReadonly();

  isUpdating(userId: string): boolean {
    return this.updatingIds().has(userId);
  }


  private async fetchUsers(query: DataQuery<UserFilters>): Promise<Page<User>> {
    const result = await this.usersService.listUsers({
      page: query.page,
      limit: query.pageSize,
      search: query.filters.search,
      status: query.filters.status,
      schoolId: query.filters.schoolId,
    });
    return {
      items: [...result.items],
      total: result.total,
    };
  }

  async activate(user: User): Promise<void> {
    await this.updateStatusOptimistic(user, UserStatus.ACTIVE);
  }

  async suspend(user: User): Promise<void> {
    await this.updateStatusOptimistic(user, UserStatus.SUSPENDED);
  }

  private async updateStatusOptimistic(user: User, status: UserStatus): Promise<void> {
    if (user.status === status) return;
    if (this.updatingIds().has(user.id)) return;

    const previous = user;
    const optimistic: User = { ...user, status };

    this.users.updateItem((u) => u.id === user.id, optimistic);
    this.updatingIds.update((set) => new Set(set).add(user.id));

    try {
      const updated = await this.usersService.updateUserStatus({
        userId: user.id,
        status,
      });

      this.users.updateItem((u) => u.id === updated.id, updated);
    } catch (error) {
      console.error(`[UsersFacade] updateStatus ${status} failed for ${user.id}`, error);
      this.users.updateItem((u) => u.id === previous.id, previous);
      throw error;
    } finally {
      this.updatingIds.update((set) => {
        const next = new Set(set);
        next.delete(user.id);
        return next;
      });
    }
  }
}
