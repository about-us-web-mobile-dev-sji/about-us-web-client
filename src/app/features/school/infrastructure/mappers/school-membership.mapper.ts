import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
  AcceptedInvitation,
  InviteMemberCommand,
  SentInvitation,
  InvitationPage,
  SchoolInvitation,
  MemberPage,
  SchoolMember,
  SchoolMemberRole,
} from '../../domain/models/school-membership.model';
import { InvitationStatus } from '../../domain/models/school-membership.model';
import type {
  ReplaceAdministratorRequestDto,
  ReplaceAdministratorResponseDto,
  AcceptInvitationResponseDto,
  InvitationResponseDto,
  InviteMemberRequestDto,
  SchoolInvitationDto,
  SchoolInvitationPageDto,
  SchoolMemberDto,
  SchoolMemberPageDto,
} from '../dto/school-membership-response.dto';

export function mapReplaceAdministratorRequest(
  command: ReplaceAdministratorCommand,
): ReplaceAdministratorRequestDto {
  return {
    newAdminUserId: command.newAdminUserId,
  };
}

export function mapReplaceAdministratorResponse(
  dto: ReplaceAdministratorResponseDto,
): ReplaceAdministratorResult {
  return {
    schoolId: dto.schoolId,
    previousAdmin: dto.previousAdmin,
    newAdmin: dto.newAdmin,
    membershipRevoked: dto.membershipRevoked,
    newMembershipCreated: dto.newMembershipCreated,
  };
}

export function mapAcceptedInvitation(dto: AcceptInvitationResponseDto): AcceptedInvitation {
  return { schoolId: dto.school.id, schoolName: dto.school.name };
}

export function mapInviteMemberRequest(command: InviteMemberCommand): InviteMemberRequestDto {
  return { email: command.email.trim().toLowerCase() };
}

export function mapSentInvitation(dto: InvitationResponseDto): SentInvitation {
  return { email: dto.email, expiresAt: new Date(dto.expiresAt) };
}

export function mapSchoolInvitation(dto: SchoolInvitationDto): SchoolInvitation {
  return {
    id: dto.id,
    schoolId: dto.schoolId,
    email: dto.email,
    status: dto.status as InvitationStatus,
    expiresAt: new Date(dto.expiresAt),
    createdAt: dto.createdAt ? new Date(dto.createdAt) : null,
    invitedBy: dto.invitedBy ?? null,
    acceptedAt: dto.acceptedAt ? new Date(dto.acceptedAt) : null,
    acceptedBy: dto.acceptedBy ?? null,
  };
}

export function mapInvitationPage(dto: SchoolInvitationPageDto): InvitationPage {
  return {
    items: dto.items.map(mapSchoolInvitation),
    total: dto.total,
    page: dto.page,
    limit: dto.limit,
    totalPages: dto.totalPages,
  };
}

export function mapSchoolMember(dto: SchoolMemberDto): SchoolMember {
  return {
    id: dto.id ?? null,
    user: dto.user,
    role: dto.role as SchoolMemberRole,
    status: dto.status ?? null,
    grantedBy: dto.grantedBy ?? null,
    grantedAt: dto.grantedAt ? new Date(dto.grantedAt) : null,
  };
}

export function mapMemberPage(dto: SchoolMemberPageDto): MemberPage {
  return {
    items: dto.items.map(mapSchoolMember),
    total: dto.total,
    page: dto.page,
    limit: dto.limit,
    totalPages: dto.totalPages,
  };
}
