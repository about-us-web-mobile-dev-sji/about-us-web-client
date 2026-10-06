import { Injectable, inject } from '@angular/core';
import { USER_REPOSITORY } from '../domain/ports/user.repository';
import type { ListUsersQuery, ListUsersResult, UpdateUserStatusCommand, User } from '../domain/models/user.model';


@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly repository = inject(USER_REPOSITORY);

  listUsers(query: ListUsersQuery): Promise<ListUsersResult> {
    return this.repository.listUsers(query);
  }

  updateUserStatus(command: UpdateUserStatusCommand): Promise<User> {
    return this.repository.updateUserStatus(command);
  }
}
