import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SPACE_REPOSITORY } from '../../domain/ports/space.repository';
import type { SpaceRepository } from '../../domain/ports/space.repository';
import type {
  ArchiveSpaceCommand,
  AssignManagerCommand,
  CreateSpaceCommand,
  DeleteSpaceCommand,
  EnsureSchoolRootCommand,
  EnsureSchoolRootResult,
  MoveSpaceCommand,
  RestoreSpaceCommand,
  Space,
  SpaceEffectiveManagers,
  SpaceMembership,
} from '../../domain/models/space.model';
import type {
  EnsureSchoolRootResponseDto,
  SpaceEffectiveManagersResponseDto,
  SpaceMembershipResponseDto,
  SpaceResponseDto,
} from '../dto/space-response.dto';
import {
  mapEffectiveManagers,
  mapEnsureSchoolRootResponse,
  mapMembership,
  mapSpaceResponse,
} from '../mappers/space.mapper';

@Injectable({ providedIn: 'root' })
export class HttpSpaceRepository implements SpaceRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async getSchoolTree(schoolId: string): Promise<Space[]> {
    const dtos = await firstValueFrom(
      this.http.get<SpaceResponseDto[]>(`${this.baseUrl}/spaces/school/${schoolId}/tree`, {
        withCredentials: true,
      }),
    );
    return dtos.map(mapSpaceResponse);
  }

  async ensureSchoolRoot(command: EnsureSchoolRootCommand): Promise<EnsureSchoolRootResult> {
    const dto = await firstValueFrom(
      this.http.post<EnsureSchoolRootResponseDto>(`${this.baseUrl}/spaces/ensure-root`, command, {
        withCredentials: true,
      }),
    );
    return mapEnsureSchoolRootResponse(dto);
  }

  async createSpace(command: CreateSpaceCommand): Promise<Space> {
    const dto = await firstValueFrom(
      this.http.post<SpaceResponseDto>(`${this.baseUrl}/spaces`, command, {
        withCredentials: true,
      }),
    );
    return mapSpaceResponse(dto);
  }

  async getEffectiveManagers(spaceId: string): Promise<SpaceEffectiveManagers> {
    const dto = await firstValueFrom(
      this.http.get<SpaceEffectiveManagersResponseDto>(
        `${this.baseUrl}/spaces/${spaceId}/members/effective-managers`,
        { withCredentials: true },
      ),
    );
    return mapEffectiveManagers(dto);
  }

  async assignManager(command: AssignManagerCommand): Promise<SpaceMembership> {
    const dto = await firstValueFrom(
      this.http.put<SpaceMembershipResponseDto>(
        `${this.baseUrl}/spaces/${command.spaceId}/members/manager`,
        { userId: command.userId },
        { withCredentials: true },
      ),
    );
    return mapMembership(dto);
  }

  async removeManager(spaceId: string): Promise<SpaceMembership> {
    const dto = await firstValueFrom(
      this.http.delete<SpaceMembershipResponseDto>(
        `${this.baseUrl}/spaces/${spaceId}/members/manager`,
        { withCredentials: true },
      ),
    );
    return mapMembership(dto);
  }

  async archiveSpace(command: ArchiveSpaceCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/spaces/${command.spaceId}/archive`,
        {},
        { withCredentials: true },
      ),
    );
  }

  async restoreSpace(command: RestoreSpaceCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/spaces/${command.spaceId}/restore`,
        {},
        { withCredentials: true },
      ),
    );
  }

  async deleteSpace(command: DeleteSpaceCommand): Promise<void> {
    const recursive = command.recursive ? '?recursive=true' : '';
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/spaces/${command.spaceId}${recursive}`, {
        withCredentials: true,
      }),
    );
  }

  async moveSpace(command: MoveSpaceCommand): Promise<void> {
    await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/spaces/${command.spaceId}/move`,
        { newParentId: command.newParentId },
        { withCredentials: true },
      ),
    );
  }
}

export const SPACE_REPOSITORY_PROVIDER = {
  provide: SPACE_REPOSITORY,
  useExisting: HttpSpaceRepository,
};
