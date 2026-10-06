import type { GlobalRole, UserStatus } from '../../domain/models/user.model';

export interface UserResponseDto {
  readonly id: string;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly email: string;
  readonly status: UserStatus;
  readonly globalRole: GlobalRole;
}

export interface ListUsersResponseDto {
  readonly items: readonly UserResponseDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface UpdateUserStatusResponseDto {
  readonly user: UserResponseDto;
}

export interface UpdateUserStatusRequestDto {
  readonly status: UserStatus;
}