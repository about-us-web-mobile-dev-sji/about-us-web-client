import { InjectionToken } from '@angular/core';
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
  inviteMember(schoolId: string, command: InviteMemberCommand): Promise<SentInvitation>;
  listInvitations(schoolId: string, query: InvitationListQuery): Promise<InvitationPage>;
  /** Administrateur : tous les membres (hors révoqués) ; membre : les membres actifs, sans e-mail. */
  listMembers(schoolId: string, query: MemberListQuery): Promise<MemberPage>;
  /** Crée une nouvelle invitation (nouvel id, nouveau jeton, 7 jours) et annule les anciennes en attente. */
  resendInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation>;
  /** Seulement pour une invitation PENDING ou EXPIRED ; le lien reçu par e-mail ne marche plus ensuite. */
  cancelInvitation(schoolId: string, invitationId: string): Promise<SchoolInvitation>;
}
