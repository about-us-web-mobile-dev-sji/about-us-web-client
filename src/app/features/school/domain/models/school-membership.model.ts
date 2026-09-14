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
