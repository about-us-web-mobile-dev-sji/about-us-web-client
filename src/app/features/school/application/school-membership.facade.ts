import { Injectable, inject } from '@angular/core';
import { SchoolMembershipService } from './school-membership.service';
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
export class SchoolMembershipFacade {
  private readonly service = inject(SchoolMembershipService);

  async replaceAdministrator(
    schoolId: string,
    command: ReplaceAdministratorCommand,
  ): Promise<ReplaceAdministratorResult> {
    try {
      return await this.service.replaceAdministrator(schoolId, command);
    } catch (error) {
      console.error("Erreur lors du remplacement de l'administrateur:", error);
      throw error;
    }
  }

  /** Rejects with an AppError (e.g. SCHOOL_INVITATION_INVALID, SCHOOL_INVITATION_MISMATCH). */
  acceptInvitation(schoolId: string, token: string): Promise<AcceptedInvitation> {
    return this.service.acceptInvitation(schoolId, token);
  }


  /** UC-16: sends the invitation e-mail (link + Google sign-in). */
  inviteMember(schoolId: string, command: InviteMemberCommand): Promise<SentInvitation> {
    return this.service.inviteMember(schoolId, command);
  }

  listMembers(schoolId: string, query: MemberListQuery): Promise<MemberPage> {
    return this.service.listMembers(schoolId, query);
  }

  listInvitations(schoolId: string, query: InvitationListQuery): Promise<InvitationPage> {
    return this.service.listInvitations(schoolId, query);
  }

  resendInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation> {
    return this.service.resendInvitation(schoolId, invitationId);
  }

  cancelInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation> {
    return this.service.cancelInvitation(schoolId, invitationId);
  }
}
