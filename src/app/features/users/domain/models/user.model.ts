export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum GlobalRole {
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  readonly id: string;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly email: string;
  readonly status: UserStatus;
  readonly globalRole: GlobalRole;
}

export interface ListUsersResult {
  readonly items: readonly User[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export type UpdateUserStatusCommand = {
  readonly userId: string;
  readonly status: UserStatus;
};

export type ListUsersQuery = {
  readonly page: number;
  readonly limit: number;
  readonly status?: UserStatus;
  readonly search?: string;
  readonly schoolId?: string;
};