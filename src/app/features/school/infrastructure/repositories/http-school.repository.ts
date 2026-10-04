import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SCHOOL_REPOSITORY } from '../../domain/ports/school.repository';
import type { SchoolRepository } from '../../domain/ports/school.repository';
import type { CreateSchoolCommand, School } from '../../domain/models/school.model';
import type { SchoolDetailDto } from '../dto/school-response.dto';
import {
  mapCreateSchoolRequest,
  mapSchoolDetail,
} from '../mappers/school.mapper';

@Injectable({ providedIn: 'root' })
export class HttpSchoolRepository implements SchoolRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async list(): Promise<School[]> {
    const dtos = await firstValueFrom(
      this.http.get<SchoolDetailDto[]>(`${this.baseUrl}/schools`, {
        withCredentials: true,
      }),
    );
    return dtos.map(mapSchoolDetail);
  }

  async create(command: CreateSchoolCommand): Promise<School> {
    const requestDto = mapCreateSchoolRequest(command);
    const responseDto = await firstValueFrom(
      this.http.post<SchoolDetailDto>(`${this.baseUrl}/schools`, requestDto, {
        withCredentials: true,
      }),
    );
    return mapSchoolDetail(responseDto);
  }

  async toggleBlock(id: string): Promise<School> {
    const responseDto = await firstValueFrom(
      this.http.patch<SchoolDetailDto>(
        `${this.baseUrl}/schools/${id}/toggle-block`,
        {},
        { withCredentials: true },
      ),
    );
    return mapSchoolDetail(responseDto);
  }
}

export const SCHOOL_REPOSITORY_PROVIDER = {
  provide: SCHOOL_REPOSITORY,
  useExisting: HttpSchoolRepository,
};
