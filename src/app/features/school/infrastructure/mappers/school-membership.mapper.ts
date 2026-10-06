import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
  AcceptedInvitation,
  InvitableRole,
  InviteMemberCommand,
  SentInvitation,
} from '../../domain/models/school-membership.model';
import type {
  ReplaceAdministratorRequestDto,
  ReplaceAdministratorResponseDto,
  AcceptInvitationResponseDto,
  InvitationResponseDto,
  InviteMemberRequestDto,
  SchoolRoleResponseDto,
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
    previousAdminUserId: dto.previousAdminUserId,
    newAdminUserId: dto.newAdminUserId,
    membershipRevoked: dto.membershipRevoked,
    newMembershipCreated: dto.newMembershipCreated,
  };
}

export function mapAcceptedInvitation(dto: AcceptInvitationResponseDto): AcceptedInvitation {
  return { schoolId: dto.school.id, schoolName: dto.school.name };
}

/** The administrator is appointed by replacement, never by invitation. */
const ADMIN_ROLE_KEY = 'SCHOOL_ADMIN';

export function mapInvitableRoles(dtos: SchoolRoleResponseDto[]): InvitableRole[] {
  return dtos
    .filter((dto) => dto.key !== ADMIN_ROLE_KEY)
    .map((dto) => ({ id: dto.id, name: dto.name, description: dto.description }));
}

export function mapInviteMemberRequest(command: InviteMemberCommand): InviteMemberRequestDto {
  return { email: command.email.trim().toLowerCase(), roleId: command.roleId };
}

export function mapSentInvitation(dto: InvitationResponseDto): SentInvitation {
  return { email: dto.email, expiresAt: new Date(dto.expiresAt) };
}
