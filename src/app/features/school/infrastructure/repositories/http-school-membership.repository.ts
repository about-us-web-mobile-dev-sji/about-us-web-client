import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../../../../core/config/api.config';
import { SCHOOL_MEMBERSHIP_REPOSITORY } from '../../domain/ports/school-membership.repository';
import type { SchoolMembershipRepository } from '../../domain/ports/school-membership.repository';
import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
  AcceptedInvitation,
  InviteMemberCommand,
  SentInvitation,
  InvitationListQuery,
  InvitationPage,
  SchoolInvitation,
  MemberListQuery,
  MemberPage,
} from '../../domain/models/school-membership.model';
import type {
  AcceptInvitationResponseDto,
  InvitationResponseDto,
  ReplaceAdministratorResponseDto,
  SchoolInvitationDto,
  SchoolInvitationPageDto,
  SchoolMemberPageDto,
} from '../dto/school-membership-response.dto';
import { toAppError } from '../../../../core/http/to-app-error';
import {
  mapAcceptedInvitation,
  mapInviteMemberRequest,
  mapSentInvitation,
  mapReplaceAdministratorRequest,
  mapReplaceAdministratorResponse,
  mapInvitationPage,
  mapSchoolInvitation,
  mapMemberPage,
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

  async listInvitations(schoolId: string, query: InvitationListQuery): Promise<InvitationPage> {
    let params = new HttpParams().set('page', query.page).set('limit', query.limit);
    if (query.status) params = params.set('status', query.status);
    const search = query.search?.trim().slice(0, 200);
    if (search) params = params.set('search', search);
    try {
      const dto = await firstValueFrom(
        this.http.get<SchoolInvitationPageDto>(this.invitationsUrl(schoolId), { params }),
      );
      return mapInvitationPage(dto);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async listMembers(schoolId: string, query: MemberListQuery): Promise<MemberPage> {
    let params = new HttpParams().set('page', query.page).set('limit', query.limit);
    if (query.role) params = params.set('role', query.role);
    const search = query.search?.trim().slice(0, 200);
    if (search) params = params.set('search', search);
    try {
      const dto = await firstValueFrom(
        this.http.get<SchoolMemberPageDto>(`${this.baseUrl}/schools/${encodeURIComponent(schoolId)}/members`, { params }),
      );
      return mapMemberPage(dto);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async resendInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation> {
    try {
      const dto = await firstValueFrom(
        this.http.post<SchoolInvitationDto>(
          `${this.invitationsUrl(schoolId)}/${encodeURIComponent(invitationId)}/resend`,
          null,
        ),
      );
      return mapSchoolInvitation(dto);
    } catch (error) {
      throw toAppError(error);
    }
  }

  async cancelInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation> {
    try {
      const dto = await firstValueFrom(
        this.http.delete<SchoolInvitationDto>(
          `${this.invitationsUrl(schoolId)}/${encodeURIComponent(invitationId)}`,
        ),
      );
      return mapSchoolInvitation(dto);
    } catch (error) {
      throw toAppError(error);
    }
  }

  private invitationsUrl(schoolId: string): string {
    return `${this.baseUrl}/schools/${encodeURIComponent(schoolId)}/invitations`;
  }
}

export const SCHOOL_MEMBERSHIP_REPOSITORY_PROVIDER = {
  provide: SCHOOL_MEMBERSHIP_REPOSITORY,
  useExisting: HttpSchoolMembershipRepository,
};
