import type {
  ReplaceAdministratorCommand,
  ReplaceAdministratorResult,
} from '../../domain/models/school-membership.model';
import type {
  ReplaceAdministratorRequestDto,
  ReplaceAdministratorResponseDto,
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
