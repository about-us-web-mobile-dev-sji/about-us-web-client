import { InjectionToken } from '@angular/core';
import type { ListUsersQuery, ListUsersResult, UpdateUserStatusCommand, User } from '../models/user.model';

export interface UserRepository {
  listUsers(query: ListUsersQuery): Promise<ListUsersResult>;
  updateUserStatus(command: UpdateUserStatusCommand): Promise<User>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('USER_REPOSITORY');