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
