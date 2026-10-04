import type { SpaceKind, SpaceStatus } from '../../domain/models/space.model';

export interface MemberDesignationDto {
  key: string;
  singular: string;
  plural: string;
}

export interface SpaceResponseDto {
  id: string;
  schoolId: string;
  parentId?: string | null;
  path: string;
  depth: number;
  kind: SpaceKind;
  name: string;
  description?: string | null;
  memberDesignation?: MemberDesignationDto | null;
  status: SpaceStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string | null;
  deletedAt?: string | null;
}

export interface EnsureSchoolRootResponseDto {
  id: string;
  schoolId: string;
  name: string;
  path: string;
  depth: number;
  kind: string;
  isNew: boolean;
}

export interface SpaceMembershipResponseDto {
  id: string;
  spaceId: string;
  userId: string;
  role: string;
  status: string;
}

export interface SpaceEffectiveManagersResponseDto {
  spaceId: string;
  directManager?: SpaceMembershipResponseDto | null;
  inheritedManagers: SpaceMembershipResponseDto[];
}

export interface AssignManagerRequestDto {
  userId: string;
}
