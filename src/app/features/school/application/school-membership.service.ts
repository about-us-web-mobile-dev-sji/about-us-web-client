import { Injectable, inject } from '@angular/core';
import { SCHOOL_MEMBERSHIP_REPOSITORY } from '../domain/ports/school-membership.repository';
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
} from '../domain/models/school-membership.model';

@Injectable({ providedIn: 'root' })
export class SchoolMembershipService {
  private readonly repository = inject(SCHOOL_MEMBERSHIP_REPOSITORY);

  async replaceAdministrator(
    schoolId: string,
    command: ReplaceAdministratorCommand,
  ): Promise<ReplaceAdministratorResult> {
    return await this.repository.replaceAdministrator(schoolId, command);
  }

  acceptInvitation(schoolId: string, token: string): Promise<AcceptedInvitation> {
    return this.repository.acceptInvitation(schoolId, token);
  }


  inviteMember(schoolId: string, command: InviteMemberCommand): Promise<SentInvitation> {
    return this.repository.inviteMember(schoolId, command);
  }

  listMembers(schoolId: string, query: MemberListQuery): Promise<MemberPage> {
    return this.repository.listMembers(schoolId, query);
  }

  listInvitations(schoolId: string, query: InvitationListQuery): Promise<InvitationPage> {
    return this.repository.listInvitations(schoolId, query);
  }

  resendInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation> {
    return this.repository.resendInvitation(schoolId, invitationId);
  }

  cancelInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation> {
    return this.repository.cancelInvitation(schoolId, invitationId);
  }
}
