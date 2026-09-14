import { InjectionToken } from '@angular/core';
import { ListUsersResult, User, UserStatus } from '../models/user.model';

export interface ListUsersQuery {
  page: number;
  limit: number;
  status?: UserStatus;
  search?: string;
  schoolId?: string;
}

export interface UpdateUserStatusCommand {
  userId: string;
  status: UserStatus;
}

export interface UserRepository {
  listUsers(query: ListUsersQuery): Promise<ListUsersResult>;
  updateUserStatus(command: UpdateUserStatusCommand): Promise<User>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('USER_REPOSITORY');