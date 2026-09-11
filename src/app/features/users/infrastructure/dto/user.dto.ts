import { GlobalRole, UserStatus } from '../../domain/models/user.model';

export interface UserResponseDto {
  id: string | undefined;
  firstName: string | null;
  lastName: string | null;
  email: string;
  status: UserStatus;
  globalRole: GlobalRole;
}

export interface ListUsersResponseDto {
  items: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateUserStatusResponseDto {
  user: UserResponseDto;
}