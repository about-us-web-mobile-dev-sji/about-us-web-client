export enum MembershipRole {
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  SCHOOL_MEMBER = 'SCHOOL_MEMBER',
}

export enum MembershipStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REVOKED = 'REVOKED',
}

export interface SchoolMembership {
  id: string;
  schoolId: string;
  userId: string;
  role: MembershipRole;
  status: MembershipStatus;
  grantedBy: string | null;
  grantedAt: Date;
  revokedAt: Date | null;
  revokedBy: string | null;
}

export interface ReplaceAdministratorCommand {
  newAdminUserId: string;
}

export interface ReplaceAdministratorResult {
  schoolId: string;
  previousAdminUserId: string | null;
  newAdminUserId: string;
  membershipRevoked: boolean;
  newMembershipCreated: boolean;
}

export interface AcceptedInvitation {
  schoolId: string;
  schoolName: string;
}

/** A role an invitee can receive (the administrator role is never offered). */
export interface InvitableRole {
  id: string;
  name: string;
  description: string | null;
}

export interface InviteMemberCommand {
  email: string;
  roleId: string;
}

export interface SentInvitation {
  email: string;
  expiresAt: Date;
}
