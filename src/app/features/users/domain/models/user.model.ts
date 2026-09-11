export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum GlobalRole {
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  id: string | undefined;
  firstName: string | null;
  lastName: string | null;
  email: string;
  status: UserStatus;
  globalRole: GlobalRole;
}

export interface ListUsersResult {
  items: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}