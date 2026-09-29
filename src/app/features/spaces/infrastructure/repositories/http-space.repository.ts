import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SPACE_REPOSITORY } from '../../domain/ports/space.repository';
import type { SpaceRepository } from '../../domain/ports/space.repository';
import type { EnsureSchoolRootCommand, EnsureSchoolRootResult, Space } from '../../domain/models/space.model';
import type { EnsureSchoolRootResponseDto, SpaceResponseDto } from '../dto/space-response.dto';
import { mapEnsureSchoolRootResponse, mapSpaceResponse } from '../mappers/space.mapper';

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
}

export const SPACE_REPOSITORY_PROVIDER = {
  provide: SPACE_REPOSITORY,
  useExisting: HttpSpaceRepository,
};
