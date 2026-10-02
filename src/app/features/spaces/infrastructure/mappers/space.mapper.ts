import type {
  EnsureSchoolRootResult,
  Space,
  SpaceEffectiveManagers,
  SpaceMembership,
  SpaceMembershipRole,
  SpaceMembershipStatus,
} from '../../domain/models/space.model';
import type {
  EnsureSchoolRootResponseDto,
  SpaceEffectiveManagersResponseDto,
  SpaceMembershipResponseDto,
  SpaceResponseDto,
} from '../dto/space-response.dto';

export function mapSpaceResponse(dto: SpaceResponseDto): Space {
  return {
    id: dto.id,
    schoolId: dto.schoolId,
    parentId: dto.parentId ?? null,
    path: dto.path,
    depth: dto.depth,
    kind: dto.kind,
    name: dto.name,
    description: dto.description ?? null,
    memberDesignation: dto.memberDesignation ?? null,
    status: dto.status,
    version: dto.version,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    archivedAt: dto.archivedAt ?? null,
    deletedAt: dto.deletedAt ?? null,
  };
}

export function mapEnsureSchoolRootResponse(dto: EnsureSchoolRootResponseDto): EnsureSchoolRootResult {
  return {
    id: dto.id,
    schoolId: dto.schoolId,
    name: dto.name,
    path: dto.path,
    depth: dto.depth,
    kind: dto.kind,
    isNew: dto.isNew,
  };
}

export function mapMembership(dto: SpaceMembershipResponseDto): SpaceMembership {
  return {
    id: dto.id,
    spaceId: dto.spaceId,
    userId: dto.userId,
    role: dto.role as SpaceMembershipRole,
    status: dto.status as SpaceMembershipStatus,
  };
}

export function mapEffectiveManagers(
  dto: SpaceEffectiveManagersResponseDto,
): SpaceEffectiveManagers {
  return {
    spaceId: dto.spaceId,
    directManager: dto.directManager ? mapMembership(dto.directManager) : null,
    inheritedManagers: (dto.inheritedManagers ?? []).map(mapMembership),
  };
}
