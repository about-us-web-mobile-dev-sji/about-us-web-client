import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SCHOOL_MEMBERSHIP_REPOSITORY } from '../../domain/ports/school-membership.repository';
import type { SchoolMembershipRepository } from '../../domain/ports/school-membership.repository';
import type { ReplaceAdministratorCommand, ReplaceAdministratorResult } from '../../domain/models/school-membership.model';
import type { ReplaceAdministratorResponseDto } from '../dto/school-membership-response.dto';
import { mapReplaceAdministratorRequest, mapReplaceAdministratorResponse } from '../mappers/school-membership.mapper';

@Injectable({ providedIn: 'root' })
export class HttpSchoolMembershipRepository implements SchoolMembershipRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async replaceAdministrator(schoolId: string, command: ReplaceAdministratorCommand): Promise<ReplaceAdministratorResult> {
    const requestDto = mapReplaceAdministratorRequest(command);
    const responseDto = await firstValueFrom(
      this.http.patch<ReplaceAdministratorResponseDto>(
        `${this.baseUrl}/schools/${schoolId}/administrator`,
        requestDto,
        { withCredentials: true },
      ),
    );
    return mapReplaceAdministratorResponse(responseDto);
  }
}

export const SCHOOL_MEMBERSHIP_REPOSITORY_PROVIDER = {
  provide: SCHOOL_MEMBERSHIP_REPOSITORY,
  useExisting: HttpSchoolMembershipRepository,
};
