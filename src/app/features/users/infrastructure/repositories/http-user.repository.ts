import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { ListUsersQuery, UpdateUserStatusCommand, USER_REPOSITORY } from '../../domain/ports/user.repository';
import { ListUsersResponseDto, UpdateUserStatusResponseDto } from '../dto/user.dto';
import { mapListUsersResponse, mapUserResponse } from '../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class HttpUserRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async listUsers(query: ListUsersQuery) {
    let params = new HttpParams()
      .set('page', query.page)
      .set('limit', query.limit);
    if (query.status) {
      params = params.set('status', query.status);
    }
    if (query.search) {
      params = params.set('search', query.search);
    }
    if (query.schoolId) {
      params = params.set('schoolId', query.schoolId);
    }
    const dto = await firstValueFrom(
      this.http.get<ListUsersResponseDto>(`${this.baseUrl}/users`, {
        params,
        withCredentials: true,
      }),
    );
    return mapListUsersResponse(dto);
  }

  async updateUserStatus(command: UpdateUserStatusCommand) {
    const dto = await firstValueFrom(
      this.http.patch<UpdateUserStatusResponseDto>(
        `${this.baseUrl}/users/${command.userId}/status`,
        { status: command.status },
        { withCredentials: true },
      ),
    );
    return mapUserResponse(dto.user);
  }
}

export const USER_REPOSITORY_PROVIDER = {
  provide: USER_REPOSITORY,
  useExisting: HttpUserRepository,
};