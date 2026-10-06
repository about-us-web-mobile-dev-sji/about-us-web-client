import { Injectable, inject } from '@angular/core';
import { SchoolMembershipService } from './school-membership.service';
import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
  AcceptedInvitation,
  InvitableRole,
  InviteMemberCommand,
  SentInvitation,
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

  listInvitableRoles(schoolId: string): Promise<InvitableRole[]> {
    return this.service.listInvitableRoles(schoolId);
  }

  /** UC-16: sends the invitation e-mail (link + Google sign-in). */
  inviteMember(schoolId: string, command: InviteMemberCommand): Promise<SentInvitation> {
    return this.service.inviteMember(schoolId, command);
  }
}
