import { InjectionToken } from '@angular/core';
import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
  AcceptedInvitation,
  InvitableRole,
  InviteMemberCommand,
  SentInvitation,
} from '../models/school-membership.model';

export const SCHOOL_MEMBERSHIP_REPOSITORY = new InjectionToken<SchoolMembershipRepository>(
  'SCHOOL_MEMBERSHIP_REPOSITORY',
);

export interface SchoolMembershipRepository {
  replaceAdministrator(
    schoolId: string,
    command: ReplaceAdministratorCommand,
  ): Promise<ReplaceAdministratorResult>;
  /** UC-16: the signed-in user joins the school with the token received by e-mail. */
  acceptInvitation(schoolId: string, token: string): Promise<AcceptedInvitation>;
  listInvitableRoles(schoolId: string): Promise<InvitableRole[]>;
  inviteMember(schoolId: string, command: InviteMemberCommand): Promise<SentInvitation>;
}
