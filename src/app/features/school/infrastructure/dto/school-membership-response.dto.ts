export interface ReplaceAdministratorRequestDto {
  newAdminUserId: string;
}

export interface ReplaceAdministratorResponseDto {
  schoolId: string;
  previousAdminUserId: string | null;
  newAdminUserId: string;
  membershipRevoked: boolean;
  newMembershipCreated: boolean;
}

export interface AcceptInvitationResponseDto {
  school: { id: string; name: string };
}

export interface SchoolRoleResponseDto {
  id: string;
  key: string | null;
  name: string;
  description: string | null;
}

export interface InviteMemberRequestDto {
  email: string;
  roleId: string;
}

export interface InvitationResponseDto {
  email: string;
  expiresAt: string;
}
