import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SCHOOL_REPOSITORY } from '../../domain/ports/school.repository';
import type { SchoolRepository } from '../../domain/ports/school.repository';
import type { CreateSchoolCommand, School, SchoolSummary } from '../../domain/models/school.model';
import type { SchoolManagedDto, SchoolResponseDto } from '../dto/school-response.dto';
import {
  mapCreateSchoolRequest,
  mapSchoolResponse,
  mapSchoolSummary,
  mapUpdateSchoolRequest,
} from '../mappers/school.mapper';

@Injectable({ providedIn: 'root' })
export class HttpSchoolRepository implements SchoolRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async list(): Promise<SchoolSummary[]> {
    const dtos = await firstValueFrom(
      this.http.get<SchoolManagedDto[]>(`${this.baseUrl}/schools/managed`, {
        withCredentials: true,
      }),
    );
    return dtos.map(mapSchoolSummary);
  }

  async create(command: CreateSchoolCommand): Promise<School> {
    const requestDto = mapCreateSchoolRequest(command);
    const responseDto = await firstValueFrom(
      this.http.post<SchoolResponseDto>(`${this.baseUrl}/schools`, requestDto, {
        withCredentials: true,
      }),
    );
    return mapSchoolResponse(responseDto);
  }

  async update(id: string, command: Partial<CreateSchoolCommand>): Promise<School> {
    const requestDto = mapUpdateSchoolRequest(command);
    const responseDto = await firstValueFrom(
      this.http.patch<SchoolResponseDto>(`${this.baseUrl}/schools/${id}`, requestDto, {
        withCredentials: true,
      }),
    );
    return mapSchoolResponse(responseDto);
  }

  async toggleBlock(id: string): Promise<School> {
    const responseDto = await firstValueFrom(
      this.http.patch<SchoolResponseDto>(
        `${this.baseUrl}/schools/${id}/toggle-block`,
        {},
        { withCredentials: true },
      ),
    );
    return mapSchoolResponse(responseDto);
  }
}

export const SCHOOL_REPOSITORY_PROVIDER = {
  provide: SCHOOL_REPOSITORY,
  useExisting: HttpSchoolRepository,
};
