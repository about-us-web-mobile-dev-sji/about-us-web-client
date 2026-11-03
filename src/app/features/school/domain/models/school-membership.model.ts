import type { UserSummary } from '../../../../shared/users/user-summary';

export enum MembershipStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REVOKED = 'REVOKED',
}

export enum SchoolMemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

/** Membre d'une école. La vue membre (non administrateur) ne renvoie que user et role. */
export interface SchoolMember {
  id: string | null;
  user: UserSummary;
  role: SchoolMemberRole;
  status: string | null;
  grantedBy: UserSummary | null;
  grantedAt: Date | null;
}

export interface MemberListQuery {
  role?: SchoolMemberRole;
  /** Nom ou e-mail (200 caractères max). */
  search?: string;
  page: number;
  limit: number;
}

export interface MemberPage {
  items: SchoolMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReplaceAdministratorCommand {
  newAdminUserId: string;
}

export interface ReplaceAdministratorResult {
  schoolId: string;
  previousAdmin: UserSummary | null;
  newAdmin: UserSummary;
  membershipRevoked: boolean;
  newMembershipCreated: boolean;
}

export interface AcceptedInvitation {
  schoolId: string;
  schoolName: string;
}

export interface InviteMemberCommand {
  email: string;
}

export interface SentInvitation {
  email: string;
  expiresAt: Date;
}

/** Suivi des invitations d'une école (contrat GET/POST/DELETE /schools/:id/invitations). */
export enum InvitationStatus {
  /** Envoyée, valide, pas encore acceptée. */
  PENDING = 'PENDING',
  /** Toujours en attente, mais la date d'expiration (7 jours) est passée : on peut la renvoyer. */
  EXPIRED = 'EXPIRED',
  /** Acceptée : l'invité est devenu membre. */
  ACCEPTED = 'ACCEPTED',
  /** Annulée par un administrateur, ou remplacée par un renvoi. */
  CANCELLED = 'CANCELLED',
}

export interface SchoolInvitation {
  id: string;
  schoolId: string;
  email: string;
  status: InvitationStatus;
  expiresAt: Date;
  createdAt: Date | null;
  invitedBy: UserSummary | null;
  acceptedAt: Date | null;
  acceptedBy: UserSummary | null;
}

export interface InvitationListQuery {
  status?: InvitationStatus;
  /** Partie de l'e-mail, sans tenir compte des majuscules (200 caractères max). */
  search?: string;
  page: number;
  limit: number;
}

export interface InvitationPage {
  items: SchoolInvitation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Renvoyer : PENDING, EXPIRED ou CANCELLED. Annuler : PENDING ou EXPIRED. */
export function canResendInvitation(status: InvitationStatus): boolean {
  return status !== InvitationStatus.ACCEPTED;
}

export function canCancelInvitation(status: InvitationStatus): boolean {
  return status === InvitationStatus.PENDING || status === InvitationStatus.EXPIRED;
}
