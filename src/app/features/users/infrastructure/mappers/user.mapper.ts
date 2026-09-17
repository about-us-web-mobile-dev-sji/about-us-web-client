import type { ListUsersResult, User } from '../../domain/models/user.model';
import type { ListUsersResponseDto, UserResponseDto } from '../dto/user.dto';

export function mapUserResponse(dto: UserResponseDto): User {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    status: dto.status,
    globalRole: dto.globalRole,
  };
}

export function mapListUsersResponse(dto: ListUsersResponseDto): ListUsersResult {
  return {
    items: dto.items.map(mapUserResponse),
    total: dto.total,
    page: dto.page,
    limit: dto.limit,
    totalPages: dto.totalPages,
  };
}

export function mapUpdateUserStatusRequest(status: User['status']): { status: User['status'] } {
  return { status };
}