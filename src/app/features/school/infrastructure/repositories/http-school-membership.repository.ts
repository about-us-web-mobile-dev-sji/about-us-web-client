import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SCHOOL_MEMBERSHIP_REPOSITORY } from '../../domain/ports/school-membership.repository';
import type { SchoolMembershipRepository } from '../../domain/ports/school-membership.repository';
import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
  AcceptedInvitation,
  InvitableRole,
  InviteMemberCommand,
  SentInvitation,
} from '../../domain/models/school-membership.model';
import type {
  AcceptInvitationResponseDto,
  InvitationResponseDto,
  ReplaceAdministratorResponseDto,
  SchoolRoleResponseDto,
} from '../dto/school-membership-response.dto';
import { toAppError } from '../../../../core/http/to-app-error';
import {
  mapAcceptedInvitation,
  mapInvitableRoles,
  mapInviteMemberRequest,
  mapSentInvitation,
  mapReplaceAdministratorRequest,
  mapReplaceAdministratorResponse,
} from '../mappers/school-membership.mapper';

@Injectable({ providedIn: 'root' })
export class HttpSchoolMembershipRepository implements SchoolMembershipRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  async replaceAdministrator(
    schoolId: string,
    command: ReplaceAdministratorCommand,
  ): Promise<ReplaceAdministratorResult> {
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

  async acceptInvitation(schoolId: string, token: string): Promise<AcceptedInvitation> {
    try {
      const dto = await firstValueFrom(
        this.http.post<AcceptInvitationResponseDto>(
          `${this.baseUrl}/schools/${encodeURIComponent(schoolId)}/accept`,
          { token },
        ),
      );
      return mapAcceptedInvitation(dto);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async listInvitableRoles(schoolId: string): Promise<InvitableRole[]> {
    try {
      const dtos = await firstValueFrom(
        this.http.get<SchoolRoleResponseDto[]>(
          `${this.baseUrl}/schools/${encodeURIComponent(schoolId)}/roles`,
        ),
      );
      return mapInvitableRoles(dtos);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async inviteMember(schoolId: string, command: InviteMemberCommand): Promise<SentInvitation> {
    try {
      const dto = await firstValueFrom(
        this.http.post<InvitationResponseDto>(
          `${this.baseUrl}/schools/${encodeURIComponent(schoolId)}/invitations`,
          mapInviteMemberRequest(command),
        ),
      );
      return mapSentInvitation(dto);
    } catch (error) {
      throw toAppError(error);
    }
  }
}

export const SCHOOL_MEMBERSHIP_REPOSITORY_PROVIDER = {
  provide: SCHOOL_MEMBERSHIP_REPOSITORY,
  useExisting: HttpSchoolMembershipRepository,
};
