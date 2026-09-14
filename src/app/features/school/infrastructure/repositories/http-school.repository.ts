import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SCHOOL_REPOSITORY } from '../../domain/ports/school.repository';
import type { SchoolRepository } from '../../domain/ports/school.repository';
import type { School, CreateSchoolCommand } from '../../domain/models/school.model';
import type { SchoolResponseDto } from '../dto/school-response.dto';
import { mapSchoolResponse, mapCreateSchoolRequest } from '../mappers/school.mapper';

@Injectable({ providedIn: 'root' })
export class HttpSchoolRepository implements SchoolRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async create(command: CreateSchoolCommand): Promise<School> {
    const requestDto = mapCreateSchoolRequest(command);
    const responseDto = await firstValueFrom(
      this.http.post<SchoolResponseDto>(`${this.baseUrl}/schools`, requestDto, {
        withCredentials: true,
      }),
    );
    return mapSchoolResponse(responseDto);
  }

  async findById(id: string): Promise<School | null> {
    try {
      const dto = await firstValueFrom(
        this.http.get<SchoolResponseDto>(`${this.baseUrl}/schools/${id}`, {
          withCredentials: true,
        }),
      );
      return mapSchoolResponse(dto);
    } catch (error: any) {
      if (error?.status === 404) return null;
      throw error;
    }
  }

  async findAll(): Promise<School[]> {
    const dtos = await firstValueFrom(
      this.http.get<SchoolResponseDto[]>(`${this.baseUrl}/schools`, {
        withCredentials: true,
      }),
    );
    return dtos.map(mapSchoolResponse);
  }

  async update(id: string, command: Partial<CreateSchoolCommand>): Promise<School> {
    const requestDto = command as any; // Pour l'update partiel
    const responseDto = await firstValueFrom(
      this.http.patch<SchoolResponseDto>(`${this.baseUrl}/schools/${id}`, requestDto, {
        withCredentials: true,
      }),
    );
    return mapSchoolResponse(responseDto);
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/schools/${id}`, {
        withCredentials: true,
      }),
    );
  }
}

export const SCHOOL_REPOSITORY_PROVIDER = {
  provide: SCHOOL_REPOSITORY,
  useExisting: HttpSchoolRepository,
};
