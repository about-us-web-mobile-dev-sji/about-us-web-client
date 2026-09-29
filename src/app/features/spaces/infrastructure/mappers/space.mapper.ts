import type { EnsureSchoolRootResult, Space } from '../../domain/models/space.model';
import type { EnsureSchoolRootResponseDto, SpaceResponseDto } from '../dto/space-response.dto';

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
