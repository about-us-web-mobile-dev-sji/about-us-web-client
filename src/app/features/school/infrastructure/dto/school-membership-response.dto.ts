import type { UserSummary } from '../../../../shared/users/user-summary';

export interface ReplaceAdministratorRequestDto {
  newAdminUserId: string;
}

export interface ReplaceAdministratorResponseDto {
  schoolId: string;
  previousAdmin: UserSummary | null;
  newAdmin: UserSummary;
  membershipRevoked: boolean;
  newMembershipCreated: boolean;
}

export interface AcceptInvitationResponseDto {
  school: { id: string; name: string };
}

export interface InviteMemberRequestDto {
  email: string;
}

export interface InvitationResponseDto {
  email: string;
  expiresAt: string;
}

/** Invitation telle que renvoyée par la liste, le renvoi (champs partiels) et l'annulation. */
export interface SchoolInvitationDto {
  id: string;
  schoolId: string;
  email: string;
  status: 'PENDING' | 'EXPIRED' | 'ACCEPTED' | 'CANCELLED';
  expiresAt: string;
  createdAt?: string;
  invitedBy?: UserSummary | null;
  acceptedAt?: string | null;
  acceptedBy?: UserSummary | null;
}

export interface SchoolInvitationPageDto {
  items: SchoolInvitationDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Ligne de GET /schools/:id/members : complète pour un administrateur, réduite (user + role) sinon. */
export interface SchoolMemberDto {
  id?: string;
  user: UserSummary;
  role: 'ADMIN' | 'MEMBER';
  status?: string;
  grantedBy?: UserSummary | null;
  grantedAt?: string;
}

export interface SchoolMemberPageDto {
  items: SchoolMemberDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
